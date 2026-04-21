package com.devcast.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Prefixo dos tópicos que o servidor publica
        // Cliente assina: /topic/sala.geral
        registry.enableSimpleBroker("/topic");

        // Prefixo das mensagens que o cliente envia para o servidor
        // Cliente envia para: /app/chat.enviar
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint de conexão WebSocket
        // Cliente conecta em: ws://localhost:8001/ws
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")  // libera CORS para dev
                .withSockJS();                  // fallback para browsers antigos
    }
}