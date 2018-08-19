const visit = require(`unist-util-visit`)
const remove = require(`unist-util-remove`)

module.exports = ({markdownAST}) => {
  visit(markdownAST, `paragraph`, (node, index, parent) => {
    const hasOnlyImagesNodes = node.children.every(child => {
      return (
        child.type === "image" ||
        (child.type === "text" && child.value === "\n")
      )
    })

    if (!hasOnlyImagesNodes) {
      return
    }

    remove(node, "text")

    parent.children.splice(index, 1, ...node.children)

    return index
  })
}
