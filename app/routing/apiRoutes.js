var friends = require("../data/friends");
var comp = [];
var thisFriend;
var lastFriend;
var n;
var bool = true;

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    friends.push(req.body);
    if (friends.length > 2) {
      for (var i = 0; i < friends.length - 1; i++) {
        var sum = 0; 
        for (var j = 0; j < friends[i].scores.length; j++) {
          sum += Math.abs(Number(friends[i].scores[j]) - Number(req.body.scores[j]));
        }
        lastFriend = sum;
        if (lastFriend < thisFriend && !bool) {
          thisFriend = lastFriend;
          n = i;
        }
      }
      thisFriend = 1000;
      res.json(friends[n]);
    } else {
      res.json(friends[0]);
      thisFriend = 1000;
      bool = false;
    }
  });
};