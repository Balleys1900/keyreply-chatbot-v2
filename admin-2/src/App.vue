<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box !important;
	}
	body {
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
			'微软雅黑', Arial, sans-serif;
	}
	.el-container {
		position: relative;
	}
	.el-aside {
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
		width: fit-content;
		height: 100vh;
	}
	.el-scrollbar__wrap {
		overflow: auto !important;
	}
	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
