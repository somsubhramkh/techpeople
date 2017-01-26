package com.niit.angularauth.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.niit.angularauth.backend.model.Message;
import com.niit.angularauth.backend.model.PrivateMessage;

@Controller
public class ChatController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	
	  @MessageMapping("/chat")
	  //@SendTo("/queue/message/{friendID}")
	  public void sendMessage(PrivateMessage privateMessage) {
		  System.out.println("Calling the method sendMessage");
		  System.out.println(" Message : "+privateMessage.getMessage());
		  
		  System.out.println(" Friend ID : "+privateMessage.getFriendName());
		  
		  simpMessagingTemplate.convertAndSend("/queue/message/"+privateMessage.getFriendName(), privateMessage);
		  //simpMessagingTemplate.convertAndSend("/queue/message/"+privateMessage.getUsername(), privateMessage);	
	   
	  }

	

}
