---
sidebar_position: 8
tags: ["vim", "vim distro", "neovim", "plugin"]
---

# neovim 플러그인

```lua title="init.lua"
-- lazyvim 플러그인 설치
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"https://github.com/folke/lazy.nvim.git",
		"--branch=stable", -- latest stable release
		lazypath,
	})
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")
```

저는 현재 Lazy 플러그인 매니저를 사용하고 있습니다.

## 테마

```lua title="lua/plugins/theme.lua"
return {
	"catppuccin/nvim",
	name = "catppuccin",
	priority = 1000,
	init = function()
		-- catppuccin 컬러 태마 설정
		vim.cmd.colorscheme "catppuccin-mocha"
	end
}
```

## 하단바

```lua title="lua/plugins/statusline.lua"
return {
	'nvim-lualine/lualine.nvim',
	dependencies = { 'nvim-tree/nvim-web-devicons' },
	config = function()
		require('lualine').setup()
	end
}
```

## 들여쓰기

![indent-plugin](/img/doc/vim/indent-plugin.png)

```lua
return {
	-- 들여쓰기 구분선 설정
	{
		'lukas-reineke/indent-blankline.nvim',
		main = 'ibl',
		opts = {},
	},
}
```

## 사이드바

![사이드바](/img/doc/vim/sidebar.png)

```lua title="lua/plugins/sidebar.lua"
-- 사이드바
return {
	"nvim-tree/nvim-tree.lua",
	cmd = { "NvimTreeToggle", "NvimTreeFocus" },
	version = "*",
	lazy = false,
	dependencies = {
		"nvim-tree/nvim-web-devicons",
	},
	init = function()
		-- 사이드 펴기 단축키
		vim.keymap.set('n', '<C-n>', vim.cmd.NvimTreeToggle, {})
		vim.keymap.set('n', '<leader>e', vim.cmd.NvimTreeFocus, {})
	end,
	config = function()
		require("nvim-tree").setup {
		}
	end,
}
```

## LSP 관리

```lua
return { 
    {
		"williamboman/mason.nvim",
		cmd = {
			"Mason",
			"MasonInstall",
			"MasonInstallAll",
			"MasonUpdate",
			"MasonUninstall",
			"MasonUninstallAll",
			"MasonLog",
		},
		config = function()
			require("mason").setup({})
			-- https://github.com/NvChad/NvChad/blob/e5f8a38ae3d6b3bedf68f29b0e96dad7a4ca2da5/lua/nvchad/plugins/init.lua
			-- NvChad 레포에서 제공하는 MasonInstallAll 커맨드를 구현함
			-- 처음부터 확정 설치를 할수 없음 MasonInstallAll로 코드로 설정을 명시하게 됨
			local ensure_installed = {
				"stylua",
				"spell",
				"codespell",
				"prettierd",
				"gospel",
				--"gofumpt",
				--"biome",
				"pylint",
				"cspell",
			}

			vim.api.nvim_create_user_command("MasonInstallAll", function()
				if ensure_installed and #ensure_installed > 0 then
					vim.cmd("MasonInstall " .. table.concat(ensure_installed, " "))
				end
			end, { desc = "Mason Install All package" })
		end,
	},
},
```

- `MasonInstallAll`은 원래 없는 명령인데 수동으로 추가했습니다.
- [NvChad](https://nvchad.com/)를 참고했습니다. 직접 [소스 코드](https://github.com/NvChad/NvChad/blob/e5f8a38ae3d6b3bedf68f29b0e96dad7a4ca2da5/lua/nvchad/plugins/init.lua
)에서 어떻게 구현했는지 확인했습니다.
- 이 명령이 있으면 해당하는 언어의 LSP를 본인의 문서말고 코드로 관리할 수 있습니다. 그냥 `MasonInstallAll` 명령으로 설치하면 됩니다.

```lua 
  -- lsp stuff
  {
    "williamboman/mason.nvim",
    cmd = { "Mason", "MasonInstall", "MasonInstallAll", "MasonUpdate", "MasonUninstall", "MasonUninstallAll", "MasonLog" },
    config = function()
      require("mason").setup({})

      local ensure_installed = {
        "stylua",
      }
      -- custom nvchad cmd to install all mason binaries listed
      vim.api.nvim_create_user_command("MasonInstallAll", function()
        if ensure_installed and ensure_installed > 0 then
          vim.cmd("MasonInstall " .. table.concat(ensure_installed, " "))
        end
      end, {})

      vim.g.mason_binaries_list = opts.ensure_installed
    end,
  },
```

- 위는 조금더 간략한 버전입니다.

## fuzzy finder

```lua title="lua/plugins/telescope.lua"
return {
	'nvim-telescope/telescope.nvim',
	branch = '0.1.x',
	dependencies = {
		'nvim-lua/plenary.nvim',
		{
			'nvim-telescope/telescope-fzf-native.nvim',
			-- NOTE: If you are having trouble with this installation,
			--       refer to the README for telescope-fzf-native for more instructions.
			build = 'make',
			cond = function()
				return vim.fn.executable 'make' == 1
			end,
		},
	},
	init = function()
		-- 검색기 활성화
		local builtin = require('telescope.builtin')
		vim.keymap.set('n', '<leader>ff', builtin.find_files, {}) -- 파일이름으로 검색
		vim.keymap.set('n', '<leader>fg', builtin.live_grep, {}) -- 단어 검색
		vim.keymap.set('n', '<leader>fb', builtin.buffers, {})   -- buffer 탭 검색
		vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
		vim.keymap.set('n', '<C-p>', builtin.git_files, {})
	end
}
```

## syntax highlight

```lua title="lua/plugins/highlight.lua"
return {
	-- :TSInstallInfo 로 설치 정보 확인
	"nvim-treesitter/nvim-treesitter",
	build = ":TSUpdate",
	dependencies = {
		'nvim-treesitter/nvim-treesitter-textobjects'
	},
	config = function()
		local config = require("nvim-treesitter.configs")
		config.setup({
			-- 하이라이트할 언어 추가
			ensure_installed = { "lua", "vim", "vimdoc", "c", "cpp", "rust", "html", "css", "javascript", "typescript", "zig" },
			highlight = { enable = true },
			indent = { enable = true },
		})
	end
}
```

## git

```lua title="lua/plugins/git.lua"
return {
	-- git 설정
	-- Adds git related signs to the gutter, as well as utilities for managing changes
	'lewis6991/gitsigns.nvim',
	opts = {
		-- See `:help gitsigns.txt`
		signs = {
			add = { text = '+' },
			change = { text = '~' },
			delete = { text = '_' },
			topdelete = { text = '‾' },
			changedelete = { text = '~' },
		},
		on_attach = function(bufnr)
			local gs = package.loaded.gitsigns

			local function map(mode, l, r, opts)
				opts = opts or {}
				opts.buffer = bufnr
				vim.keymap.set(mode, l, r, opts)
			end

			-- Navigation
			map({ 'n', 'v' }, ']c', function()
				if vim.wo.diff then
					return ']c'
				end
				vim.schedule(function()
					gs.next_hunk()
				end)
				return '<Ignore>'
			end, { expr = true, desc = 'Jump to next hunk' })

			map({ 'n', 'v' }, '[c', function()
				if vim.wo.diff then
					return '[c'
				end
				vim.schedule(function()
					gs.prev_hunk()
				end)
				return '<Ignore>'
			end, { expr = true, desc = 'Jump to previous hunk' })

			-- Actions
			-- visual mode
			map('v', '<leader>hs', function()
				gs.stage_hunk { vim.fn.line '.', vim.fn.line 'v' }
			end, { desc = 'stage git hunk' })
			map('v', '<leader>hr', function()
				gs.reset_hunk { vim.fn.line '.', vim.fn.line 'v' }
			end, { desc = 'reset git hunk' })
			-- normal mode
			map('n', '<leader>hs', gs.stage_hunk, { desc = 'git stage hunk' })
			map('n', '<leader>hr', gs.reset_hunk, { desc = 'git reset hunk' })
			map('n', '<leader>hS', gs.stage_buffer, { desc = 'git Stage buffer' })
			map('n', '<leader>hu', gs.undo_stage_hunk, { desc = 'undo stage hunk' })
			map('n', '<leader>hR', gs.reset_buffer, { desc = 'git Reset buffer' })
			map('n', '<leader>hp', gs.preview_hunk, { desc = 'preview git hunk' })
			map('n', '<leader>hb', function()
				gs.blame_line { full = false }
			end, { desc = 'git blame line' })
			map('n', '<leader>hd', gs.diffthis, { desc = 'git diff against index' })
			map('n', '<leader>hD', function()
				gs.diffthis '~'
			end, { desc = 'git diff against last commit' })

			-- Toggles
			map('n', '<leader>tb', gs.toggle_current_line_blame, { desc = 'toggle git blame line' })
			map('n', '<leader>td', gs.toggle_deleted, { desc = 'toggle git show deleted' })

			-- Text object
			map({ 'o', 'x' }, 'ih', ':<C-U>Gitsigns select_hunk<CR>', { desc = 'select git hunk' })
		end,
	},
}
```

## tabs

![tabs](/img/2024-02-14/tabs.png)

```lua title="lua/plugins/tabs.lua"
return {
	'akinsho/bufferline.nvim',
	version = "*",
	dependencies = 'nvim-tree/nvim-web-devicons',
	init = function()
		vim.keymap.set("n", "bs", vim.cmd.BufferLineCloseOthers)
		--vim.keymap.set("n", "<leader>bcr", vim.cmd.BufferLineCloseRight)
		--vim.keymap.set("n", "<leader>bcl", vim.cmd.BufferLineCloseLeft)
		vim.keymap.set("n", "bct", vim.cmd.BufferLinePickClose)
		vim.keymap.set("n", "bt", vim.cmd.BufferLinePick) -- buffer target
	end,
	config = function()
		local bufferline = require('bufferline')
		vim.opt.termguicolors = true
		require("bufferline").setup {
			options = {
				mode = "buffers",
				style_preset = bufferline.style_preset.minimal,
				themable = true,
				numbers = "ordinal",
				close_command = "bdelete! %d", -- can be a string | function, | false see "Mouse actions"
				right_mouse_command = "bdelete! %d", -- can be a string | function | false, see "Mouse actions"
				left_mouse_command = "buffer %d", -- can be a string | function, | false see "Mouse actions"
				middle_mouse_command = nil, -- can be a string | function, | false see "Mouse actions"
				indicator = {
					icon = '▎', -- this should be omitted if indicator style is not 'icon'
					style = 'underline', -- 'icon' | 'underline' | 'none',
				},
				buffer_close_icon = '󰅖',
				modified_icon = '●',
				close_icon = '',
				left_trunc_marker = '',
				right_trunc_marker = '',
				diagnostics = "nvim_lsp",
				offsets = {
					{
						filetype = "NvimTree",
						text = "File Explorer", -- "File Explorer" | function ,
						text_align = "center", -- "left" | "center" | "right"
						separator = true
					}
				},
				padded_slant = true,
				color_icons = true, -- whether or not to add the filetype icon highlights
				get_element_icon = function(element)
					-- element consists of {filetype: string, path: string, extension: string, directory: string}
					-- This can be used to change how bufferline fetches the icon
					-- for an element e.g. a buffer or a tab.
					-- e.g.
					local icon, hl = require('nvim-web-devicons').get_icon_by_filetype(element.filetype, { default = false })
					return icon, hl
					-- or
					--local custom_map = {my_thing_ft: {icon = "my_thing_icon", hl}}
					--return custom_map[element.filetype]
				end,
				diagnostics_indicator = function(count, level, diagnostics_dict, context)
					local icon = level:match("error") and " " or ""
					return " " .. icon .. count
				end,
				separator_style = "thin", -- "slant" | "slope" | "thick" | "thin" | { 'any', 'any' },
				hover = {
					enabled = true,
					delay = 200,
					reveal = { 'close' }
				},
				show_buffer_icons = true,   -- true | false, -- disable filetype icons for buffers
				show_buffer_close_icons = true, -- true | false,
				show_close_icon = true,     --true | false,
				show_tab_indicators = true, --true | false,
			},
		}
	end
}
```

## undotree

![](/img/doc/vim/undotree.png)

```lua
return {
	"mbbill/undotree",
	config = function()
		-- window 간 이동할 때는 mac 기준 ctrl + w -> h, j, k, l 으로 이동
		-- toggle을 누리기 때문에 leader(스페이스바)를 누르는 동안 u를 눌러야 열고 닫을 수 있음
		vim.keymap.set("n", "<leader>u", vim.cmd.UndotreeToggle)
	end,
}
```

[nvim-window - easily switch between windows in the current tab page](https://www.reddit.com/r/neovim/comments/oflohn/nvimwindow_easily_switch_between_windows_in_the/)

위는 윈도우간 이동을 알려주는 포스트입니다. (`ctrl` + `w`) + (`h`/`j`/`k`/`l`) 인데 w를 window라고 생각하면 직관적입니다.

<iframe className="codepen" src="https://www.youtube.com/embed/w7i4amO_zaE?t=810" title="0 to LSP : Neovim RC From Scratch" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

위 설정을 참고했습니다.

## statusline

![](/img/doc/vim/statusline.png)

```lua
return {
	"nvim-lualine/lualine.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	config = function()
		-- https://github.com/nvim-lualine/lualine.nvim/blob/master/examples/bubbles.lua
		-- 위는 참고한 레포입니다.
		require("lualine").setup({
			options = { component_separators = "", section_separators = { left = "", right = "" } },
			sections = {
				lualine_a = { { "mode", separator = { left = "" }, right_padding = 2 } },
				--lualine_b = { "filename", "branch" },
				--lualine_c = {
				--"%=", [> add your center compoentnts here in place of this comment <]
				--},
				--lualine_x = {},
				--lualine_y = { "filetype", "progress" },
				lualine_z = {
					{ "location", separator = { right = "" }, left_padding = 2 },
				},
			},
		})
	end,
}
```
