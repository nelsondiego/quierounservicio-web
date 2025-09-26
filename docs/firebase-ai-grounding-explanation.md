# Conectando la IA de Gemini con Google Search en Tiempo Real a través de Firebase

Recientemente, Firebase anunció una actualización muy solicitada para sus SDK de cliente de AI Logic: la capacidad de "conectar a tierra" (grounding) los modelos de IA de Gemini con la Búsqueda de Google. Esto resuelve uno de los mayores desafíos de los modelos de lenguaje grandes (LLMs): su conocimiento está congelado en el tiempo.

## El Problema: Conocimiento Estático

Piensa en un LLM estándar como una enciclopedia brillante pero impresa el año pasado. No puede responder preguntas sobre eventos actuales, tendencias de mercado recientes o lanzamientos de nuevos productos porque su conocimiento se limita a los datos con los que fue entrenado.

Esta "fecha de corte del conocimiento" es un gran obstáculo para los desarrolladores que desean crear aplicaciones de IA verdaderamente dinámicas y fiables.

## La Solución: Conectando tu IA al "Ahora"

La conexión a tierra (grounding) con la Búsqueda de Google permite que el modelo Gemini realice una búsqueda en tiempo real en la web *antes* de generar una respuesta. Este proceso asegura que la respuesta del modelo se base en los hechos más actuales y relevantes disponibles.

En resumen, combina la capacidad de razonamiento del LLM con los datos actualizados al segundo de la Búsqueda de Google.

### ¿Qué puedes construir con esto?

- **Soporte al cliente hiper-actualizado:** Accediendo a la documentación más reciente del producto o al estado del servicio.
- **Contenido oportuno:** Incorporando noticias de última hora, resultados deportivos recientes o tendencias emergentes.
- **Planificadores dinámicos de viajes y eventos:** Que pueden reaccionar a cambios o cancelaciones de último minuto.

## ¿Cómo empezar?

Para utilizar esta función, debes actualizar a la última versión de los SDK de Firebase AI Logic y habilitar la herramienta `googleSearch` al configurar tu modelo.

**Ejemplo de configuración del modelo:**

```javascript
const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
  // Habilitar la conexión a tierra con Google Search
  tools: [{ googleSearch: {} }],
});

const result = await model.generateContent("¿Quién ganó la Eurocopa 2024?");
```

Cuando el modelo decide usar la búsqueda, la respuesta incluirá un objeto `groundingMetadata` con información sobre las búsquedas realizadas y las fuentes utilizadas.

### Requisito de Uso: Mostrar las Fuentes

Para cumplir con los requisitos de uso, tu aplicación debe mostrar las sugerencias de búsqueda que Google proporciona en la respuesta. Esto se hace extrayendo el contenido HTML del campo `searchEntryPoint` y renderizándolo en tu UI.

**Ejemplo para mostrar el resultado:**

```javascript
function GroundedResult({ result }) {
  // Obtener el texto de la respuesta del modelo y el HTML de la búsqueda
  const responseText = result.response.text();
  const renderedSearchSuggestions =
    result.response.candidates?.[0]?.groundingMetadata?.searchEntryPoint
      ?.renderedContent;

  // Mostrar el resultado solo si hay sugerencias de búsqueda disponibles
  if (renderedSearchSuggestions) {
    return (
      <div>
        <p>{responseText}</p>
        <div dangerouslySetInnerHTML={{ __html: renderedSearchSuggestions }} />
      </div>
    );
  } else {
    return (
      <div>
        <p>El resultado no se basó en la búsqueda</p>
      </div>
    );
  }
}
```

Esta nueva capacidad abre un mundo de posibilidades para crear aplicaciones de IA más inteligentes, relevantes y conectadas con el mundo real.