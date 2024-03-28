import { fetchEventSource } from "@microsoft/fetch-event-source"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { setFetchingFalse, setFetchingTrue } from "~langRedux/LanguageSlice"
import { useAppDispatch } from "~langRedux/store"

import { useLangRedux } from "./getLanguageStates"

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
          model: "deepseek-coder",

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
export const useStreamData = (text: string, command: string) => {
  const dispatch = useAppDispatch()
  const { chatText, fetching } = useLangRedux()
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState("")
  useEffect(() => {
    setCounter((prev) => prev + 1)
    const fetchDataStream = async () => {
      setMessage("")
      const url = "https://api.deepseek.com/v1/chat/completions"
      const accessToken = "sk-03e47d6091b7427a9bcce56cd66abac4"
      const content = command
        ? `please ${command ? command : "talk about"} this : ${text}`
        : `${text}`
      const requestData = {
        messages: [
          {
            content,

            role: "user"
          }
        ],
        model: "deepseek-coder",
        frequency_penalty: 0,
        max_tokens: 2048,
        presence_penalty: 0,
        stop: null,
        stream: true,
        temperature: 1,
        top_p: 1
      }

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
      dispatch(setFetchingTrue())
      await fetchEventSource(url, {
        method: "POST",
        headers,
        body: JSON.stringify(requestData),
        onclose() {
          console.log("connection closed")
        },
        onmessage(event) {
          // console.log("event is", event.data);
          // console.log(
          //   JSON.parse(event.data.split("data:")[1]).choices[0].delta.content
          // );
          if (!event.data.includes("DONE"))
            setMessage(
              (prev) => prev + JSON.parse(event.data).choices[0].delta.content
            )
          if (event.data.includes("DONE"))
            setTimeout(() => {
              dispatch(setFetchingFalse())
            }, 4000)

          // console.log(JSON.parse(event.data).choices[0].delta.content);
        }
      })
      // dispatch(setFetchingFalse())
    }
    if (chatText.length === 0) return
    console.log("counter is", counter)

    fetchDataStream()
  }, [chatText])
  return message
}
