package com.project.chatbot.service;

import com.project.chatbot.entity.Chat;
import com.project.chatbot.entity.Message;
import com.project.chatbot.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChatService chatService;
    private final AIService aiService; // Gemini API integration

    public List<Message> sendMessage(Long chatId, Long userId, String userMessage) {
        Chat chat = chatService.getChat(chatId, userId);

        Message userMsg = new Message();
        userMsg.setChat(chat);
        userMsg.setSender("USER");
        userMsg.setContent(userMessage);
        messageRepository.save(userMsg);

        // AI response
        Message aiMsg = new Message();
        aiMsg.setChat(chat);
        aiMsg.setSender("AI");
        aiMsg.setContent(aiService.generateResponse(userMessage)); // implement API call
        messageRepository.save(aiMsg);

        return messageRepository.findAllByChatId(chatId);
    }
}
