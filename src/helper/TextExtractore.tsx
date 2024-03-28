export function extractCodeBlocks(text) {
  const regex = /```([\s\S]*?)```/g
  const codeBlocks = []
  let match

  while ((match = regex.exec(text)) !== null) {
    codeBlocks.push(match[1])
  }

  return codeBlocks
}
