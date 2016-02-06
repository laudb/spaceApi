if (Meteor.isClient) {

  Template.contentRegion.helpers({
    viewData: function () {
      return Session.get('apiData');
    }
  });

  Template.contentRegion.events({
    'click button': function (e,t) {
      e.preventDefault();
      var id = Meteor.settings.public.nasaApiKey;
      Meteor.call('getData', id, function(e, r){
        if(e){
          Session.set('apiData',{error: e});
        } else {
          Session.set('apiData',r);
          return r;
        }
      });
      $('button').attr('disabled','disabled');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      'getData':function(id){
        console.log('Getting data for ', id);
        var apiUrl = "https://api.nasa.gov/planetary/apod?api_key="+id;
        var response = HTTP.get(apiUrl).data;
        return response
      }
    });

  });

}


