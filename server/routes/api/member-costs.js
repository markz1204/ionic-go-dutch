var mongoose = require('mongoose');
var router = require('express').Router();
var Session = mongoose.model('Session');
var MemberCost = mongoose.model('MemberCost');

var auth = require('../auth');

router.param('session', function(req, res, next, slug) {
  Session.findOne({ slug: slug})
    .populate('organiser')
    .populate({
      path: 'members',
      model: 'User'
    })
    .exec(function (err, session) {
      if (!session) { return res.sendStatus(404); }

      req.sessionObj = session;

      return next();
    }).catch(next);
});

router.get('/:session', auth.required, function(req, res, next){

  if(req.sessionObj) {
    return MemberCost.find({session: req.sessionObj})
      .populate('member')
      .populate({path: 'session', populate:{path:'organiser', model:'User'}})
      .populate({path: 'session', populate:{path: 'members', model:'User'}})
      .then(function(memberCosts){
      return res.json({
              memberCosts:  memberCosts.map(function(memberCost){
                return memberCost.toJSONForDetails();
              })
      });
    }).catch(next);
  }else{
    return res.json({"sessionCosts:":[]});
  }
});


router.post('/:session', auth.required, function(req, res, next){

  var memberCostsInReq = req.body.memberCosts;

  memberCostsInReq.forEach(function(mc){
    var newMC = new MemberCost();
    newMC.member = mongoose.Types.ObjectId(mc.member.id);
    newMC.session = mongoose.Types.ObjectId(mc.session.id);
    newMC.costAmount = mc.costAmount;

    MemberCost.findOne({member: newMC.member, session: newMC.session}).then(function(memberCost){

      if(memberCost){
        memberCost.costAmount = newMC.costAmount;
        memberCost.save();
      }else{
        newMC.save();
      }
  });

    if(req.sessionObj) {
      return MemberCost.find({session: req.sessionObj})
        .populate('member')
        .populate({path: 'session', populate:{path:'organiser', model:'User'}})
        .populate({path: 'session', populate:{path: 'members', model:'User'}})
        .then(function(memberCosts){
          return res.json({
            memberCosts:  memberCosts.map(function(memberCost){
              return memberCost.toJSONForDetails();
            })
          });
        }).catch(next);
    }else{
      return res.json({"sessionCosts:":[]});
    }
  });

});


module.exports = router;
