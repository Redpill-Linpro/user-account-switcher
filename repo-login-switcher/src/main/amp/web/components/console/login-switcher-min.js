!function(){var e=YAHOO.util.Dom,s=Alfresco.util.encodeHTML;Alfresco.ConsoleSwitchUsers=function(t){Alfresco.ConsoleSwitchUsers.superclass.constructor.call(this,t),Alfresco.util.ComponentManager.register(this),Alfresco.util.YUILoaderHelper.require(["button","container","datasource","datatable","json"],this.onComponentsLoaded,this);var a=this;return ViewPanelHandler=function(){ViewPanelHandler.superclass.constructor.call(this,"view")},YAHOO.extend(ViewPanelHandler,Alfresco.ConsolePanelHandler,{foundUsers:[],onLoad:function(){var e=this,s=function(s,t){e.onSwitchUserClick(s,t,e)};a.widgets.switchButton=Alfresco.util.createYUIButton(a,"switch-button",s),a.widgets.dataSource=new YAHOO.util.DataSource(Alfresco.constants.PROXY_URI+"api/people",{responseType:YAHOO.util.DataSource.TYPE_JSON,responseSchema:{resultsList:"people",metaFields:{recordOffset:"startIndex",totalRecords:"totalRecords"}}}),a.widgets.dataSource.doBeforeParseData=function(s,t){var a=t;if(t){for(var o=t.people,r=[],l=0;l<o.length;l++)"guest"==o[l].userName||0==o[l].userName.indexOf("guest&")||o[l].userName==Alfresco.constants.USERNAME?(o.splice(l,1),l--):1==o[l].enabled&&(r.push(o[l]),e.foundUsers.push(o[l].userName));a={people:r}}return a},this._setupDataTable();var t=function(s,t,o){e._setDefaultDataTableErrors(a.widgets.dataTable),a.widgets.dataTable.onDataReturnInitializeTable.call(a.widgets.dataTable,s,t,o)},o=function(s,t){if(401==t.status)window.location.reload();else try{var o=YAHOO.lang.JSON.parse(t.responseText);a.widgets.dataTable.set("MSG_ERROR",o.message),a.widgets.dataTable.showTableMessage(o.message,YAHOO.widget.DataTable.CLASS_ERROR),e._setResultsMessage("message.noresults")}catch(r){e._setDefaultDataTableErrors(a.widgets.dataTable)}};a.widgets.dataSource.sendRequest("",{success:t,failure:o,scope:a})},_setupDataTable:function(){var e=function(e,t,a,o){e.innerHTML=s(o)},t=[{key:"userName",label:a._msg("label.username"),sortable:!1,formatter:e,width:150}];a.widgets.dataTable=new YAHOO.widget.DataTable(a.id+"-datatable",t,a.widgets.dataSource,{initialLoad:!1,selectionMode:"single",renderLoopSize:32,dynamicData:!0,generateRequest:function(e,s){e=e||{pagination:null,sortedBy:null};var t=encodeURIComponent(e.sortedBy?e.sortedBy.key:s.getColumnSet().keys[0].getKey()),o=e.sortedBy&&e.sortedBy.dir===YAHOO.widget.DataTable.CLASS_DESC?"desc":"asc",r="?sortBy="+t+"&dir="+o;return a.searchTerm&&(r=r+"&filter="+encodeURIComponent(a.searchTerm)),r},MSG_EMPTY:a._msg("message.empty")}),a.widgets.dataTable.subscribe("rowClickEvent",this.onUserSelectClick)},onUserSelectClick:function(s){var t=s.target.children;if(a.widgets.dataTable.unselectAllRows(),t){this.selectRow(s.target);var o=a.widgets.dataTable.getSelectedRows()[0],r=a.widgets.dataTable.getRecord(o);e.get(a.id+"-personName").value=r.getData("userName")}},onSwitchUserClick:function(t,o,r){var l=r,n=e.get(a.id+"-personName"),i=YAHOO.lang.trim(n.value);l.foundUsers.indexOf(i)>-1?Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.URL_PAGECONTEXT+"api/switch-login?user="+encodeURIComponent(i)+"&pw=1",responseContentType:"json",successCallback:{fn:function(e){void 0!==e.json?(Alfresco.util.PopupManager.displayMessage({text:a._msg("message.switching-user",s(a.group))}),Alfresco.util.navigateTo(Alfresco.constants.URL_PAGECONTEXT+"user/"+e.json.userName+"/dashboard")):Alfresco.util.PopupManager.displayPropmpt({title:e.servletResponse.statusText,text:a._msg("message.switching-failure",s(a.group))})},scope:this}}):Alfresco.util.PopupManager.displayMessage({text:a._msg("message.invalid-user",s(a.group))})},_setDefaultDataTableErrors:function(e){Alfresco.util.message;e.set("MSG_EMPTY",a._msg("message.empty","Alfresco.ConsoleSwitchUsers")),e.set("MSG_ERROR",a._msg("message.error","Alfresco.ConsoleSwitchUsers"))}}),new ViewPanelHandler,this},YAHOO.extend(Alfresco.ConsoleSwitchUsers,Alfresco.ConsoleTool,{onReady:function(){Alfresco.ConsoleSwitchUsers.superclass.onReady.call(this)},_msg:function(e){return Alfresco.util.message.call(this,e,"Alfresco.ConsoleSwitchUsers",Array.prototype.slice.call(arguments).slice(1))}})}();