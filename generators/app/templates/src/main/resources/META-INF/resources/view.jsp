<%%@ include file="/init.jsp" %>

<link rel="stylesheet" type="text/css" href="/o/<%= portletName %>/node_modules/font-awesome@4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css" href="/o/<%= portletName %>/node_modules/primeng-wl@5.2.1-SNAPSHOT6/resources/themes/omega/theme.css"/>
<link rel="stylesheet" type="text/css" href="/o/<%= portletName %>/node_modules/primeng-wl@5.2.1-SNAPSHOT6/resources/primeng.min.css"/>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmnEbqsea0dTLV4KvWrQ_c6dwgfRWjzk4"></script>

<div id="<portlet:namespace />"></div>

<base href="/">
<aui:script require="<%=portletName%>@1.0.0">
	<%= camel %>100.default('#<portlet:namespace />');
</aui:script>