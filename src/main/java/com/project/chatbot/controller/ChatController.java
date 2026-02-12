package com.project.chatbot.controller;

import com.project.chatbot.entity.Chat;
import com.project.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/all")
    public List<Chat> getChats(@RequestParam Long userId) {
        return chatService.getUserChats(userId);
    }

    @PostMapping("/create")
    public Chat createChat(@RequestParam Long userId) {
        return chatService.createChat(userId);
    }
}
