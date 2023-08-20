import m from 'mithril'

export function Desc(initialVnode) {
  console.log("Hello from Desc as a function")
  console.log(initialVnode)

  var theData = {}

  return {
    oninit: async function(vnode) {
      console.log("oninit")
      console.log(vnode)
      try {

        theData = await m.request({
          method: "GET",
          url: "/desc/"+vnode.attrs.refID+".json"
        })
      } catch (err) {
        theData = {
          ref: 'Does not exist'
        }
      }
      console.log("Really loaded")
      console.log(theData)
      m.redraw()
    },
    view: function(vnode) {
      console.log("Hello from the view")
      console.log(theData)
      const items = []
      for (const prop in theData) {
        console.log(prop)
        items.push(
          m("li", m("strong",prop), theData[prop])
        )
      }
      console.log(items)
      return m("div", m("ul", items))
    }
  }
}
