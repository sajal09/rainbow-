import React,{Component} from 'react';
import './App.css';

function onDisconnectedListener() {
  console.log("onDisconnected");
}




function App(){
    

    var session;  

    var token = "";

    var QB = require('../node_modules/quickblox/quickblox');

    var CREDENTIALS = {
      'appId': "",
      'authKey': '',
      'authSecret': ''
    };

    QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);

    const sessioncreater = () => {

      var params = {login: 'sajal',password: 'quickblox' };  

    var token = ""

    QB.createSession(params, function(err, result) {
      if(result)
      {
      console.log("session created");
      console.log(result);
      token = result.token
      console.log(token)
      }
      else
      {
      console.log("error thrown");
      console.error(err);// callback function
      }
    });

    }
   
    
  QB.webrtc.onCallListener = function(currentsession, extension) {


      console.log("iiiiiiiiiiitttttttts exeeeeeeeeectured")
      console.log(currentsession)
      console.log(extension)

      session = currentsession

      var mediaParams = {
        audio: true,
        video: true,
        options: {
          muted: true,
          mirror: true
        },
        elemId: "localVideo"
      };
      

      currentsession.getUserMedia(mediaParams, function(err, stream) {
        if (err) {
          console.log("error in video call")
          console.error(err)
        } else {
          console.log("video passed with lajas")
          console.log(stream)
        }
      });

     
  
  };  

  QB.webrtc.onUserNotAnswerListener = function(session, userId) {
    console.log("User is not answering the phone")
    console.log(session)
    console.log(userId)
    
  };

    
  
  const createus = () => {
    var param = {
      login: 'russs',
      password: "someSecret",
      full_name: "quickblox",
      email: 'moron@gmail.com'
    };
    
    QB.users.create(param, function(err, res) {
      if (err) {
        console.log("error in creation")
        console.error(err)
      } else {
        console.log(res)
      }
    });
  }


  const destroyus = () => {

    QB.destroySession(function(error) {
      if(error)
      {
      console.log("error in destroy session");
      console.error(error);
      }
    });

  }

  const chatconnect = () => {

    var userCredentials = {
      userId: 115593063,
      password: 'quickblox'
    };
    
    QB.chat.connect(userCredentials, function(error, contactList) {
      if (error) {
        console.log("error in creation of CHAT")
        console.error(error)
      } else {
        console.log(contactList)
      }
    });

  }

  const getusers = () => {

    var searchParams = {email: "moron@gmail.com"};
    
    QB.users.get(searchParams, function(error, user){
      if(user){
        console.log("users found");
        console.log(user);
      }
      else{
        console.log("error in finding users");
        console.error(error);
      }
    
});

  }

  const chatdisconnect = () => {

    QB.chat.disconnect();

    QB.chat.onDisconnectedListener = onDisconnectedListener();

    console.log("chat Disconnected")

  }

  const videoconnect = () => {

    var calleesIds = [115593241];
    
    var sessionType = QB.webrtc.CallType.VIDEO; // AUDIO is also possible
    var additionalOptions = {};

    session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);

    var mediaParams = {
      audio: true,
      video: true,
      options: {
        muted: true,
        mirror: true
      },
      elemId: "localVideo"
    };
    
    session.getUserMedia(mediaParams, function(err, stream) {
      if (err) {
        console.log("error in video call")
        console.error(err)
      } else {
        console.log("video passed")
        console.log(stream)
      }
    });

    

  }

  const videochatwithlajas = () => {

    var extension = {};
    session.call(extension, function(error) {
      if(error){
        console.log("Error is occuring here");
        console.error(error);
      }
    
    });

  }

  const acceptvideochatwithlajas = () => {

    session.accept({});
     
  }

  const rejectvideochatwithlajas = () => {

    session.reject({});

  }

  const stopvideochatwithlajas = () => {

    var extension = {};
    session.stop(extension);

  }

  QB.webrtc.onRemoteStreamListener = function(session, userID, remoteStream) {
    // attach the remote stream to DOM element
    session.attachMediaStream("opponentVideo", remoteStream);
  };

  QB.webrtc.onStopCallListener = function(session, userId, extension) {
    console.log("lajas has ended the call you idiot");
  };

  QB.webrtc.onRejectCallListener = function(session, userId, extension) {
    console.log("lajas has rejected the call");
  };

  QB.webrtc.onUserNotAnswerListener = function(session, userId) {
    console.log("Pick up the damn phone call mister");
  };


  
    
  return (
    <div>
    Sajal
    <button onClick={sessioncreater}>Create arbitary session</button>
    <button onClick = {createus}>clickus</button>
    <button onClick = {destroyus}>deleteus</button>
    <button onClick = {getusers}>Getuser</button>
    <button onClick = {chatconnect}>ChatConnect</button>
    <button onClick = {chatdisconnect}>DisChatConnect</button>
    <button onClick = {videoconnect}>VideoConnect</button>
    <button onClick = {videochatwithlajas}>VideoChatwithlajas</button>
    <button onClick = {acceptvideochatwithlajas}>AcceptVideoChatwithlajas</button>
    <button onClick={rejectvideochatwithlajas}>Rejectvideochatwithlajas</button>
    <button onClick={stopvideochatwithlajas}>Stopthecallwithlajas</button>
    <div>
        <video id="localVideo" autoPlay playsInline></video>
        <video id="opponentVideo" autoPlay playsInline></video>
    </div>
    </div>
  );

}
export default App;









