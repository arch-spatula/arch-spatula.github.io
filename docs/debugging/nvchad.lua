-- Copy to ~/.config/nvim/lua/plugins/blog-debug.lua.
return {
  "mfussenegger/nvim-dap",
  opts = function()
    local dap = require "dap"
    dap.adapters.node = {
      type = "server",
      host = "127.0.0.1",
      port = "${port}",
      executable = {
        command = vim.fn.stdpath "data" .. "/mason/bin/js-debug-adapter",
        args = { "${port}" },
      },
    }
  end,
}
