const helper=require('node-red-node-test-helper')
const lowerNode=require('../src/lower-case.js')

describe("单元测试", function() {
  it("字符串转小写", function() {
    "Hello".toLowerCase().should.equal("hello");
  })
})

describe('lower-case Node', function() {
  // beforeEach(function(done) {
  //   helper.startServer(done);
  // });

  afterEach(function(done) {
    helper.unload();
  });

  it('加载组件', function(done) {
    var flow = [{id:"n1", type:"lower-case", name: "lower-case" }];
    helper.load(lowerNode, flow, function() {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'lower-case');
      done();
    });
  })

  it('数据处理', function(done) {
    var flow = [{id:"n1", type:"lower-case", name: "lower-case", wires:[["n2"]] },
                {id:"n2", type:"helper"}];
    helper.load(lowerNode, flow, function() {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function(msg) {
        msg.should.have.property('payload', 'uppercase');
        done();
      });
      n1.receive({payload:"UpperCase"});
    });
  })
})