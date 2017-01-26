package com.niit.angularauth.rest.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.niit.angularauth.backend.model.Message;
import com.niit.angularauth.backend.model.OutputMessage;
import com.niit.angularauth.backend.model.User;

@Controller
public class ChatForumController {
	
    
	
	  @MessageMapping("/chat_forum") 
	  @SendTo("/topic/message")        
	  public OutputMessage sendMessage(Message message) {
		 
		  
		  
		  System.out.println("inside sendMessage method");
		  
	    return new OutputMessage(message, new Date()); //appending current date
	  }


}
