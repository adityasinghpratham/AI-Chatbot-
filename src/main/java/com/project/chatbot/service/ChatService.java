package com.project.chatbot.service;

import com.project.chatbot.entity.Chat;
import com.project.chatbot.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public Chat createChat(Long userId) {
        Chat chat = new Chat();
        chat.setUserId(userId);
        chat.setTitle("New Chat");
        return chatRepository.save(chat);
    }

    public List<Chat> getUserChats(Long userId) {
        return chatRepository.findByUserId(userId);
    }

    public Chat getChat(Long chatId, Long userId) {
        return chatRepository.findByIdAndUserId(chatId, userId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
    }
}
