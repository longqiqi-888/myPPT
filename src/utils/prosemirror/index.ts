import { Schema,DOMParser } from "prosemirror-model"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { schemaMarks, schemaNodes } from "./schema"

// 描述文档元素
const schema = new Schema({
    // node 的属性 表明这个node的内容
    nodes:schemaNodes,
    // 被用来对 inline content 增加额外的样式和其他信息，如em
    marks:schemaMarks
})

// 创建文本
export const createDocument = (content:string)=>{
  const htmlString =  `<div>${content}</div>`
//   DOMParser:可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document
    const parser = new window.DOMParser()
    const element = parser.parseFromString(htmlString,'text/html').body.firstElementChild
    console.log(parser.parseFromString(htmlString,'text/html').body.childNodes[0],'DOMParser');
    
    // 当一个 schema 包含 parseDOM 字段时, 你可以使用 DOMParser.fromSchema 创建一个 DOMParser 对象
    return DOMParser.fromSchema(schema).parse(element as Element)
}
// 初始化数据
export const initProsemirrorEditor = (dom:Element,content:string,props = {})=>{
    return new EditorView(dom,{
        state:EditorState.create({
            doc:createDocument(content),
            plugins: []
          }),
          ...props
    })
}