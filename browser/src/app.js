import m from "mithril"

import { Desc  } from "./desc.js"

//m.mount(document.body, Desc)


m.route(document.body, '/default',{
  '/desc/:refID' : Desc,
  '/default' : Desc
})


/*
{
  view: function() {
    return m("h1", "Hello there world!")
  }
}
*/