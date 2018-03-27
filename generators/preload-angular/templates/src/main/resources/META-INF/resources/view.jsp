<%%@ include file="/init.jsp" %>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmnEbqsea0dTLV4KvWrQ_c6dwgfRWjzk4"></script>

	<style>

		.app-loading {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 400px;
			background-color: rgba(0, 0, 0, 0.6)
		}

		.app-loading .spinner {
			height: 200px;
			width: 200px;
			animation: rotate 2s linear infinite;
			transform-origin: center center;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
		}

		.app-loading .spinner .path {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
			animation: dash 1.5s ease-in-out infinite;
			stroke-linecap: round;
			stroke: #ddd;
		}

		@keyframes rotate {
			100% {
				transform: rotate(360deg);
			}
		}

		@keyframes dash {
			0% {
				stroke-dasharray: 1, 200;
				stroke-dashoffset: 0;
			}
			50% {
				stroke-dasharray: 89, 200;
				stroke-dashoffset: -35px;
			}
			100% {
				stroke-dasharray: 89, 200;
				stroke-dashoffset: -124px;
			}
		}
	</style>

	<div id="<portlet:namespace />">
		<!-- loading layout replaced by app after startupp -->
		<div class="app-loading">
			<div class="logo"></div>
			<svg class="spinner" viewBox="25 25 50 50">
				<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
			</svg>
		</div>
	</div>

	<base href="/">
	<aui:script require="<%=portletName%>@1.0.0">
		<%= camel %>100.default('#<portlet:namespace />');
	</aui:script>