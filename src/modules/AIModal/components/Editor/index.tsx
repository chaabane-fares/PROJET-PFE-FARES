import HilightCode from '../Hilights'

interface IFile {
  file?: {
    content: string
    name: string
    path: string
  }
  readyToUse?: string
  language?: string
}
export default function Editor({ file, readyToUse, language }: IFile) {
  return (
    <div className="editor">
      <HilightCode file={file} addLinesNumbers readyToUse={readyToUse} language={language!} />
    </div>
  )
}
