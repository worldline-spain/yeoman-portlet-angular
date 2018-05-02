<%%@ include file="/init.jsp" %>

<%- cssImports %>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmnEbqsea0dTLV4KvWrQ_c6dwgfRWjzk4"></script>

<div id="<portlet:namespace />" class="angular"></div>

<base href="/">
<aui:script require="<%=portletName%>@1.0.0">
	<%= camel %>100.default('#<portlet:namespace />');
</aui:script>


