---
sidebar_position: 8
tags: ['vim', 'vim distro', 'neovim', 'plugin']
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
