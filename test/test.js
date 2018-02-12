var expect = require('chai').expect;
var functions = require('../server');

describe("returnPark", function() {
  it('themepark argument should return an object for that same park', function() {
    expect(functions.returnPark('Magic Kingdom').constructor.name).to.equal('WaltDisneyWorldMagicKingdom');
    expect(functions.returnPark('Epcot').constructor.name).to.equal('WaltDisneyWorldEpcot');
    expect(functions.returnPark('Hollywood Studios').constructor.name).to.equal('WaltDisneyWorldHollywoodStudios');
    expect(functions.returnPark('Animal Kingdom').constructor.name).to.equal('WaltDisneyWorldAnimalKingdom');
  })
});
