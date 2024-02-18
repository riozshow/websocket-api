const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Testimonial = require('../../../models/testimonial.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/performer', () => {
  before(async () => {
    await Testimonial.deleteMany();
    await Concert.deleteMany();

    const performer = new Testimonial({
      _id: '65d290b5fadabd69bcc55655',
      author: 'Author #1',
      text: 'Test',
    });
    await performer.save();

    const performer2 = new Testimonial({
      _id: '65d290b5fadabd69bcc55657',
      author: 'Author #2',
      text: 'Test',
    });
    await performer2.save();

    const performers = [performer, performer2];

    const genres = ['IDM', 'Future Garage'];

    await Promise.all(
      new Array(6).fill(1).map((n, index) => {
        const concert = new Concert({
          performer: performers[index <= 2 ? 0 : 1]._id,
          genre: genres[index <= 2 ? 0 : 1],
          price: index <= 2 ? 15 : 50,
          day: index <= 2 ? 1 : 2,
          image: '/testimage.jpg',
        });
        return concert.save();
      })
    );
  });

  it('should return concerts related to the requested perfomer', async () => {
    const res = await request(server).get(
      '/api/concerts/performer/65d290b5fadabd69bcc55655'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(3);
    res.body.map((concert) =>
      expect(concert.performer).to.be.equal('65d290b5fadabd69bcc55655')
    );
  });

  it('should return concerts related to the requested genre', async () => {
    const res = await request(server).get('/api/concerts/genre/IDM');

    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(3);
    res.body.map((concert) => expect(concert.genre).to.be.equal('IDM'));
  });

  it('should return concerts related to the requested price range', async () => {
    const res = await request(server).get('/api/concerts/price/10/20');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(3);
    res.body.map((concert) => {
      expect(concert.price).to.be.greaterThan(10);
      expect(concert.price).to.be.lessThan(20);
    });
  });

  it('should return concerts of the requested day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(3);
    res.body.map((concert) => expect(concert.day).to.be.equal(1));
  });

  after(async () => {
    await Testimonial.deleteMany();
    await Concert.deleteMany();
  });
});
