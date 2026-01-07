import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Send,
  Bot,
  User,
  Clock,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MessageSquare,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Settings
} from 'lucide-react';

const TilabAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy TILab, tu asistente académico de LABS TI. Estoy aquí para ayudarte con información sobre laboratorios, cursos, materiales y cualquier duda que tengas. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState([
    '¿Cuáles son los laboratorios disponibles?',
    '¿Cómo puedo reservar un espacio?',
    '¿Qué materiales hay para el curso de redes?',
    '¿Cuál es el horario de los laboratorios?'
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Predefined responses based on keywords
    if (message.includes('laboratorio')) {
      return {
        content: 'Tenemos 3 laboratorios principales: 📍 **Laboratorio de Redes** - Equipamiento especializado en redes con routers y switches. 📍 **Laboratorio de Software** - Computadoras de alto rendimiento para desarrollo. 📍 **Laboratorio de Hardware** - Estaciones completas para diagnóstico y reparación. ¿Te gustaría conocer más sobre alguno en particular?',
        suggestions: ['Ver horarios del laboratorio de redes', 'Reservar laboratorio de software', 'Capacidad del laboratorio de hardware']
      };
    }
    
    if (message.includes('reserv') || message.includes('horario')) {
      return {
        content: 'Para reservar un laboratorio: 1️⃣ Ve a la sección "Disponibilidad" 2️⃣ Selecciona el laboratorio y horario disponible 3️⃣ Completa el formulario de reserva. Los horarios son de Lunes a Viernes 7:00-21:00 y Sábados 8:00-13:00. ¿Quieres que te ayude a encontrar disponibilidad ahora?',
        suggestions: ['Consultar disponibilidad ahora', 'Ver mi historial de reservas', 'Políticas de cancelación']
      };
    }
    
    if (message.includes('curso')) {
      return {
        content: 'Ofrecemos cursos como: 📚 **Redes de Computadoras** - Configuración y administración de redes. 📚 **Sistemas Operativos** - Instalación y gestión de Linux/Windows. 📚 **Programación Web** - Desarrollo frontend y backend. 📚 **Bases de Datos** - Diseño y administración. ¿Hay algún curso específico que te interese?',
        suggestions: ['Ver materiales de redes', 'Inscribirme a un curso', 'Requisitos de los cursos']
      };
    }
    
    if (message.includes('material') || message.includes('pdf') || message.includes('guía')) {
      return {
        content: 'Tenemos una biblioteca completa con: 📄 Guías de prácticas, 📄 Manuales técnicos, 📄 Tutoriales paso a paso, 📄 Documentación oficial. Puedes acceder desde la sección "Materiales" y filtrar por curso. También puedes descargar los PDFs directamente. ¿Buscas material para algún curso en específico?',
        suggestions: ['Ver todos los materiales', 'Descargar guía de redes', 'Manuales de configuración']
      };
    }
    
    if (message.includes('hola') || message.includes('buen día')) {
      return {
        content: `¡Hola ${user?.nombre || 'estudiante'}! 👋 ¿Cómo estás hoy? Estoy aquí para ayudarte con todo lo relacionado con LABS TI. Puedes preguntarme sobre laboratorios, cursos, materiales, reservas o cualquier tema académico. ¿En qué te puedo asistir?`,
        suggestions: ['Ver mis cursos activos', 'Consultar disponibilidad', 'Novedades esta semana']
      };
    }
    
    if (message.includes('gracias')) {
      return {
        content: '¡De nada! 😊 Me alegra haber podido ayudarte. Si necesitas algo más, aquí estaré. ¿Hay algo más en lo que pueda asistirte?',
        suggestions: ['Sí, tengo otra pregunta', 'No, gracias por ahora', 'Calificar esta conversación']
      };
    }
    
    // Default response
    return {
      content: 'Entiendo tu consulta. Puedo ayudarte con información sobre:\n\n🔹 **Laboratorios** - Disponibilidad y reservas\n🔹 **Cursos** - Contenido y materiales\n🔹 **Materiales** - Descargas de guías y manuales\n🔹 **Horarios** - Consultas de disponibilidad\n\n¿Podrías darme más detalles sobre lo que necesitas? Así puedo darte una respuesta más específica.',
      suggestions: suggestions
    };
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(messageText);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        suggestions: botResponse.suggestions || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Lo siento, he tenido un problema al procesar tu solicitud. Por favor, intenta de nuevo en unos momentos.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/🔹/g, '•')
      .replace(/📍/g, '•')
      .replace(/📚/g, '•')
      .replace(/📄/g, '•')
      .replace(/🔹/g, '•')
      .replace(/(\d+️⃣)/g, '$1')
      .replace(/😊|👋|🤖/g, match => match)
      .replace(/\n/g, '<br />');
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleRateResponse = (messageId, rating) => {
    // In a real app, this would send feedback to the backend
    console.log(`Message ${messageId} rated: ${rating}`);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-ulima-orange rounded-lg flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">TILab Assistant</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500">En línea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSendMessage('Ver mis cursos activos')}
              className="p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen size={16} className="text-ulima-orange mb-1" />
              <div className="font-medium">Mis Cursos</div>
            </button>
            <button
              onClick={() => handleSendMessage('Consultar disponibilidad')}
              className="p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Clock size={16} className="text-ulima-orange mb-1" />
              <div className="font-medium">Disponibilidad</div>
            </button>
            <button
              onClick={() => handleSendMessage('Descargar materiales')}
              className="p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Lightbulb size={16} className="text-ulima-orange mb-1" />
              <div className="font-medium">Materiales</div>
            </button>
            <button
              onClick={() => handleSendMessage('Ayuda general')}
              className="p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HelpCircle size={16} className="text-ulima-orange mb-1" />
              <div className="font-medium">Ayuda</div>
            </button>
          </div>
        </div>

        {/* Chat Info */}
        <div className="flex-1 p-4">
          <div className="bg-ulima-orange/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">💡 Tip</h3>
            <p className="text-sm text-gray-600">
              Puedes preguntarme sobre laboratorios, cursos, materiales, horarios o cualquier duda académica. 
              Estoy disponible 24/7 para ayudarte.
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ulima-orange rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.nombre?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.nombre || 'Invitado'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.rol || 'usuario'}</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ulima-orange rounded-lg flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">TILab Assistant</h1>
                <p className="text-sm text-gray-500">Asistente académico inteligente</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <RotateCcw size={18} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Activo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-ulima-orange'
                        : 'bg-gray-200'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-gray-600" />
                    )}
                  </div>
                  
                  <div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-ulima-orange text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                        className={message.type === 'user' ? 'text-white' : 'text-gray-900'}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 px-2">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => handleRateResponse(message.id, 'up')}
                            className="p-1 text-gray-400 hover:text-green-600"
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => handleRateResponse(message.id, 'down')}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            💡 {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje aquí..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ulima-orange focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex-shrink-0 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TilabAssistant;