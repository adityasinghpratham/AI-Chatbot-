package com.project.chatbot.controller;

import com.project.chatbot.entity.Message;
import com.project.chatbot.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/send")
    public List<Message> sendMessage(
            @RequestParam Long chatId,
            @RequestParam Long userId,
            @RequestParam String userMessage) {
        return messageService.sendMessage(chatId, userId, userMessage);
    }
}
