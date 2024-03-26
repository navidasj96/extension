// components/CustomTextField.tsx

import { useTheme } from "@emotion/react"
import { Box, TextareaAutosize } from "@mui/material"
import { Button } from "antd"
import { useFormik } from "formik"
import { useEffect } from "react"
import { BsFillSendFill } from "react-icons/bs"
import { useDispatch } from "react-redux"

import { useLangRedux } from "~helper/getLanguageStates"
import { useGetChat } from "~helper/translateApi"
import {
  setChatConversation,
  setChatText,
  setCommand,
  setConvertation,
  setSelectedTextTemplateOpen,
  setTextFromHtml
} from "~langRedux/LanguageSlice"

const WriteAboutTextField: React.FC = () => {
  const { chatText, converstaion, textFromHtml, command } = useLangRedux()
  const { data, error, isFetching, refetch } = useGetChat(chatText, command)

  const dispatch = useDispatch()
  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    submitForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      text: ""
    },
    onSubmit: async (values) => {
      console.log("write about me values", values)
      dispatch(setCommand(""))

      dispatch(setChatText(values.text))
      dispatch(setConvertation({ type: "req", text: values.text }))
      setFieldValue("text", "")
    }
  })

  useEffect(() => {
    console.log("chat text is ", chatText)
  }, [chatText])
  useEffect(() => {
    if (chatText.length > 0) {
      refetch()
    }
  }, [chatText])
  useEffect(() => {
    console.log("data changed", data)

    if (data && data.choices && !isFetching) {
      dispatch(setChatConversation(data.choices[0].message.content))
      dispatch(
        setConvertation({ type: "res", text: data.choices[0].message.content })
      )
    }
    console.log("converstaion is :", converstaion)
  }, [data])
  return (
    <div className="  w-[95%] lg:w-[90%]    ">
      <form onSubmit={handleSubmit}>
        <Box position="relative">
          <TextareaAutosize
            className="w-[100%] bg-[#E7E8EA]  text-left ltr text-sm font-normal font-sans leading-normal p-3 rounded-xl 
             shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid 
             border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 
              dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border transition-all duration-200"
            aria-label="empty textarea"
            placeholder={
              textFromHtml
                ? "what do you want to do with this text?"
                : "Ask me anything"
            }
            minRows={6}
            value={values.text}
            onChange={handleChange}
            id="text"
            onBlur={handleBlur}
          />
          <Box position="absolute" bottom={20} right={10}>
            <button
              disabled={values.text.length === 0}
              className={` text-gray-300 text-[20px] cursor-pointer ${
                values.text.length > 0 && "text-[#8e54c5]  "
              }`}
              onClick={() => {
                if (textFromHtml.length === 0 || !textFromHtml) {
                  submitForm()
                }
                // dispatch(setChatText(values.text))
                if (textFromHtml && textFromHtml.length > 0) {
                  dispatch(setConvertation({ type: "res", text: textFromHtml }))
                  dispatch(setConvertation({ type: "req", text: values.text }))
                  dispatch(setSelectedTextTemplateOpen(false))
                  dispatch(setChatText(textFromHtml))
                  dispatch(setCommand(values.text))
                  dispatch(setTextFromHtml(""))
                  setFieldValue("text", "")
                }
              }}>
              <BsFillSendFill />
            </button>
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default WriteAboutTextField
