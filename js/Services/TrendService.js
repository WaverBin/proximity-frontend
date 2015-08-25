angular.module('proximity.services').factory('Trends', function() {
	// Some fake testing data
  var trendGuids = [guid(), guid()];
  var trends = [
      {
        id: trendGuids[1],
        createdBy: user.id,
        name: 'Science in Sherbrooke',
        picture:'https://pbs.twimg.com/profile_images/378800000340736617/432ff0e8f065858d519ef09192bbb135_400x400.jpeg',
        users: [
          user,
          { id: 5, name: "Mark Zuckerberg", type:"WEB" },
          { id: 4, name: "Fred", type:"WEB", picture:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/008/0fa/0257d9a.jpg' }
        ],
        messages: [
          { id:guid(), conversationId: trendGuids[1], from: 5, content: { text: "Nice game everyone!" }, timestamp: new Date('2015-07-26T11:51:00').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: user.id, content: { text: "yeah we nailed it ?!" }, timestamp: new Date('2015-07-26T11:51:21').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: 4, content: { text: "pretty much, 56-25?!" }, timestamp: new Date('2015-07-26T11:51:45').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: 4, content: { text: "I will go to the bar to celebrate!!" }, timestamp: new Date('2015-07-26T11:52:10').getTime(), status: 'read'  },
          { id:guid(), conversationId: trendGuids[1], from: user.id, content: { text: "Can I go with you m8 ??" }, timestamp: new Date('2015-07-26T11:52:21').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: 5, content: { text: "Yeah sure, everyone can come" }, timestamp: new Date('2015-07-26T11:52:45').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: user.id, content: { text: "Shit, not sure I'll come.. my gfs wants me to be home early tonight because it's been 6 years today since we started dating. " }, timestamp: new Date('2015-07-26T11:53:10').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: user.id, content: { text: "Is that ok?" }, timestamp: new Date('2015-07-26T11:53:21').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: 4, content: { text: "Yeah sure np!" }, timestamp: new Date('2015-07-26T11:53:45').getTime(), status: 'read' },
          { id:guid(), conversationId: trendGuids[1], from: user.id, content: { text: "I'll come next time !!" }, timestamp: new Date('2015-07-26T11:54:10').getTime(), status: 'read' }
        ],
      }
  ];
  
    var get = function(id) {
      return _.find(trends, function(trend){ return trend.id == id; });
    };
    
    var all = function() {
      return trends;
    };
    
  return {
    all: all,
    get: get
  };
});