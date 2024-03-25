window.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString()
  if (selectedText) {
    // dispatch(setChatText(selectedText))
    // alert(`Selected text: ${selectedText}`)
    chrome.runtime.sendMessage({ selectedText: selectedText })
  }

  //
})
// window.addEventListener("click", (event) => {
//   const selectedText = window.getSelection().toString()
//   if (!selectedText) {
//     chrome.runtime.sendMessage({ selectedText: null })
//   }

//   //
// })

// window.addEventListener("beforeunload", () => {
//   chrome.runtime.sendMessage({ closing: true })
// })
