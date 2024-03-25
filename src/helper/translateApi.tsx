import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const apiUrl = "https://api.deepseek.com/v1/chat/completions"
const apiKey = "sk-03e47d6091b7427a9bcce56cd66abac4"

export const fetchChatResponse = async (text: string, command: string) => {
  if (text.length > 0) {
    try {
      const content = command
        ? `please ${command ? command : "talk about"} this : ${text}`
        : `${text}`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content
            }
          ]
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      return "Translation failed"
    }
  } else return null
}

export const useGetChat = (text: string, command: string) => {
  const { data, refetch, error, isFetching } = useQuery({
    queryKey: ["chat_response"],
    queryFn: async () => await fetchChatResponse(text, command)
  })

  return { data, refetch, error, isFetching }
}

// export const getModels = async () => {
//   try {
//     const response = fetch("https://api.deepseek.com/v1/models", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//     });

//     const data = (await response).json();
//     // console.log("models are", data);

//     return data;
//   } catch (error) {
//     return "Translation failed";
//   }
// };
