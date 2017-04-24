"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(t){function e(t,e){var i="string"==typeof t?document.getElementById(t):t,n=i.cloneNode(!1);return n.innerHTML=e,i.parentNode.replaceChild(n,i),n}function i(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,t.isPlainObject(n)&&n),this.init()}var n=window._,a=t(document),r="qor.variations",o="qor.replicator",s="enableVariations."+r,d="disable."+r,l="click."+r,c="keyup."+r,h="changed.medialibrary",f="addedMultiple."+o,u="addedMultipleDone."+o,p='.qor-product__property select[data-toggle="qor.chooser"]',m=".qor-product__property-selector",v=".qor-product__table tbody",b=".qor-product__table table",_=".qor-product__table tbody tr",g=".qor-product__container",y=".qor-fieldset",q=".qor-fieldset__add",k="qor_variants_id_",V="should_remove",D="is_removed",$=".is_deleted",T="tr.is-selected:not("+$+")",C="is_current",I=".qor-fieldset--init",M=".qor-fieldset:not(.qor-fieldset--new,.qor-product-init)",x=".qor-field__mediabox-data",w=".qor-product__button-save",E=".qor-product__bulk-save",j=".qor-product__filter-options",B='input[name*="QorResource.Variations"]:visible',O='input[name*="QorResource.Variations"][type!="hidden"]';return i.prototype={constructor:i,init:function(){var e=this.$element,i=e.data("input-name");i&&"QorResource.Variations"!=i&&(B='input[name*="'+i+'"]:visible',O='input[name*="'+i+'"][type!="hidden"]'),this.bind(),this.variants={},this.PrimaryInitMetaData={},this.productMetas=[],this.templateData=[],this.primaryMeta=[],this.existVariantsID=[],this.primaryMetaValue=[],this.replicatorTemplate=[],this.$tbody=e.find(v),this.$replicatorBtn=e.find(q),this.$fieldBlock=e.find(".qor-product__container>.qor-field__block"),this.BottomSheets=t("body").data("qor.bottomsheets"),this.initMetas(),this.initPrimaryMeta()},bind:function(){a.on(f,this.addVariantReplicator.bind(this)).on(u,this.addVariantReplicators.bind(this)),this.$element.on("select2:select select2:unselect",p,this.selectVariants.bind(this)).on(l,".qor-product__action--edit",this.editVariant.bind(this)).on(l,".qor-product__action--delete",this.deleteVariant.bind(this)).on(l,".qor-product__filter a",this.filterVariant.bind(this)).on(l,".qor-product__filter-actions__edit",this.bulkEditVariants.bind(this)).on(l,".qor-product__filter-actions__delete",this.bulkDeleteVariants.bind(this)).on(l,".qor-product__action--add",this.addBackDeletedVariants.bind(this)).on(l,".qor-product__fullscreen",this.fullscreen.bind(this)).on(l,"label.mdl-checkbox input:checkbox",this.showBulkEditVariantToolbar.bind(this))},unbind:function(){a.off(f,this.addVariantReplicator.bind(this)).off(u,this.addVariantReplicators.bind(this)),this.$element.off("select2:select select2:unselect",p,this.selectVariants.bind(this)).off(l,".qor-product__action--edit",this.editVariant.bind(this)).off(l,".qor-product__action--delete",this.deleteVariant.bind(this)).off(l,".qor-product__filter a",this.filterVariant.bind(this)).off(l,".qor-product__filter-actions__edit",this.bulkEditVariants.bind(this)).off(l,".qor-product__filter-actions__delete",this.bulkDeleteVariants.bind(this)).off(l,".qor-product__action--add",this.addBackDeletedVariants.bind(this)).off(l,".qor-product__fullscreen",this.fullscreen.bind(this)).off(l,"label.mdl-checkbox input:checkbox",this.showBulkEditVariantToolbar.bind(this))},initMetas:function(){for(var e=this.$element.find(".qor-product__meta"),i=0,n=e.length;n>i;i++)this.productMetas.push(t(e[i]).data("inputName"));this.setTemplate()},fullscreen:function(){this.$element.toggleClass("fullscreen").find(".qor-product__fullscreen i").toggle(),t(".qor-slideout").toggleClass("overflow-hidden")},collectExistVariantsID:function(){for(var e=this.$tbody.find("tr:not(."+D+")"),i=0,n=e.length;n>i;i++)this.existVariantsID.push(t(e[i]).attr("variants-id"))},initPrimaryMeta:function(){for(var e=this.$element.find(m),i=this.$element.find(I),n={},a=[],r=void 0,o=0,s=e.length;s>o;o++){var d=[],l=t(e[o]).attr("data-filter-meta",o).data("variant-type");if(this.primaryMeta.push(l),i.length){for(var c=0,h=i.length;h>c;c++){var f=t(i[c]),u=f.find("[name$="+l+"]").not('[type="hidden"]'),p=u.val(),v={},b={};if(u.is("select")&&p){var _=u.find('option[value="'+p+'"]').html();v[l]=_,v.id=p,r=this.checkSameObj(a,v),r||(d.push(v),this.primaryMetaValue.push({type:_,meta:l})),b[l+"_ID"]=v.id,b[l]=v[l],f.data("variants-"+l,b)}a.push(v)}d.length&&(n[l+"s"]=d)}}this.variants=this.PrimaryInitMetaData=n,this.variantsKey=this.collectObjectKeys(),this.handleTemplateData(),this.initPrimarySelector(),this.primaryMetaValue.length&&this.initFilter(),this.setCollectionID(i)},initPrimarySelector:function(){var e=this.PrimaryInitMetaData,i=Object.keys(e);this.ingoreInitChange=!0;for(var n=0,a=i.length;a>n;n++){for(var r=i[n].slice(0,-1),o=t('[data-variant-type="'+r+'"]').find(".qor-field__input-selector"),s=e[i[n]],d=0,l=s.length;l>d;d++){var c=o.find('option[value="'+s[d].id+'"]');c.length?c.prop("selected",!0):o.append("<option selected value='"+s[d].id+"'>"+s[d][r]+"</option>")}o.trigger("change")}this.ingoreInitChange=!1},initFilter:function(){var t=this.primaryMetaValue,e=this.$element.find(j);e.html("");for(var n=0,a=t.length;a>n;n++){var r=t[n];r.number=this.primaryMeta.indexOf(r.meta),e.append(window.Mustache.render(i.TEMPLATE_FILTER,r))}},toggleCheckbox:function(e,i){e.each(function(){i?t(this).addClass("is-checked").find(".mdl-checkbox__input").prop("checked",!0).closest("tr").addClass("is-selected"):t(this).removeClass("is-checked").find(".mdl-checkbox__input").prop("checked",!1).closest("tr").removeClass("is-selected")})},filterVariant:function(e){var i=t(e.target),n=i.data("filter-type"),a=this.$element.find(b),r=function(){var t=a.find(T);t.length&&(this.toggleCheckbox(t.find("label.mdl-checkbox")),this.toggleCheckbox(a.find("th label.mdl-checkbox")))}.bind(this);switch(n){case"all":a.find("th label.mdl-checkbox").trigger("click");break;case"none":r();break;default:r(),this.toggleCheckbox(this.$tbody.find('tr[variants-id*="_'+this.removeSpace(n)+'_"] label.mdl-checkbox'),!0)}a.find("label.mdl-checkbox").removeClass("is-focused"),this.showVariantToolbar()},showBulkEditVariantToolbar:function(){setTimeout(this.showVariantToolbar.bind(this),1)},showVariantToolbar:function(){var t=this.$tbody.find(T),e=this.$element.find(".qor-product__filter-actions"),i=t.length,n=this.$element.find(b).find("th label.mdl-checkbox");i?e.show().find("em").html(i):(e.hide(),n.hasClass("is-checked")&&this.toggleCheckbox(n))},bulkEditVariants:function(){var e=this.initBulkVariantsForm(),i=this.$tbody.find("tr:first"),n=this.$element.find(".qor-variants__edit"),a=i.find("td").length,r=t('<tr class="qor-variants__edit"><td class="normal" colspan='+a+"></td></tr>"),o='<button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+E.replace(".","")+'">\n                                OK\n                            </button>\n                            <button type="button" class="mdl-button mdl-js-button qor-product__bulk-cancel">\n                                Cancel\n                            </button><span class="qor-product__bulk-hint"></span>';return n.length?!1:(i.before(r),void e.appendTo(r.find("td")).show().append(o).trigger("enable").on(l,".qor-product-icon",this.checkBulkEdit.bind(this)).on(l,E,this.saveBulkEdit.bind(this)).on(l,".qor-product__bulk-cancel",this.removeBulkEdit.bind(this)))},checkBulkEdit:function(e){var i=t(e.target).closest(".qor-product-icon"),n=this.$element.find(".qor-variants__edit"),a=n.find(".qor-product__bulk-hint"),r=void 0;i.toggleClass("selected"),r=n.find(".qor-product-icon.selected").length,r?a.html(r+" items will be updated"):a.html("")},removeBulkEdit:function(){this.$element.find(".qor-variants__edit").remove()},saveBulkEdit:function(){var e=this.$element.find(".qor-product-icon.selected").parent(),i=this.$tbody.find(T),n=[],a=[];return e.length?i.length?(i.each(function(){a.push(t(this).attr("variants-id"))}),e.each(function(){var e=t(this).find(O+","+x),i={};e.length&&(e.is(x)&&(i.isImage=!0,i.isDeleted=t(x).data("isDeleted"),i.$element=t(this)),i.name=e.prop("name").match(/\.\w+$/g)[0].replace(".",""),i.value=e.is(":checkbox")?e.is(":checked"):e.val(),n.push(i))}),void this.syncBulkEditValue(n,a)):(window.alert("No variants select!"),!1):(this.$element.find(".qor-variants__edit").remove(),!1)},syncBulkEditValue:function(t,e){for(var i=this.$element,n=0,a=e.length;a>n;n++)for(var r='fieldset[fieldset-varitions-id="'+e[n]+'"]',o=0,s=t.length;s>o;o++){var d=t[o],l=d.name,c=d.value,h=this.$tbody.find(T+' td[data-variant-type="'+l+'"]'),f=i.find(r+' [name$=".'+l+'"][type!="hidden"]');d.isImage?this.bulkAddImages(d,r):h.html(c),f.is(":checkbox")?(f.prop("checked",c),c?f.closest("label").addClass("is-checked"):f.closest("label").removeClass("is-checked")):f.val(c)}i.find(".qor-variants__edit").remove()},bulkAddImages:function(e,i){var n=e.$element;if(n){var a=this.$element.find(i),r=a.find(".qor-field__mediabox-list"),o=n.find(".qor-field__mediabox-item").not(".is_deleted"),s=this.$tbody.find(T+' td[data-variant-type="'+e.name+'"]'),d="";o.length?(r.find(".qor-field__mediabox-item").remove(),o.each(function(){var e=t(this),i=e.data("primary-key"),n=e.data("original-url");d=d+"<img data-primary-key='"+i+"' src='"+n+"'/>"}),s.html(d),o.appendTo(r)):(s.html(""),r.find(".qor-field__mediabox-item").remove())}},bulkDeleteVariants:function(e){var i=this.$tbody.find(T),n=this,a=t(e.target).data();return i.length&&a.confirm&&window.QOR.qorConfirm(a,function(e){if(e){for(var a=0,r=i.length;r>a;a++){var o=t(i[a]).attr("variants-id");n.hideRemovedVariants(o)}n.$element.find(".qor-product__filter-actions").hide(),n.showVariantToolbar()}}),!1},initBulkVariantsForm:function(){var t=this.primaryMeta,e=this.$element.find(".qor-fieldset--new").clone();t.push("Product");for(var i=0,n=t.length;n>i;i++)e.find("[name$="+t[i]+"]").not('[type="hidden"]').closest(".qor-form-section").remove();return e.find(".qor-form-section .qor-field").prepend('<span class="qor-product-icon"><i class="material-icons normal">panorama_fish_eye</i><i class="material-icons selected">check_circle</i></span>'),e.find(".qor-fieldset__delete").remove(),e.prepend("<h2>Bulk Edit</h2>"),e},addBackDeletedVariants:function(e){var i=t(e.target).closest("tr"),n=i.attr("variants-id");return n?void this.addBackVariants(n):!1},addBackVariants:function(t){var e=this.$tbody.find('tr[variants-id="'+t+'"]'),i=this.$element.find('fieldset[fieldset-varitions-id="'+t+'"]'),a=e.hasClass("is_deleted"),r=void 0;e.length&&i.length&&(e.removeClass(V+" "+D+" is_deleted is-selected"),r=this.$tbody.find("tr:not("+$+"):last"),a&&(e.find("label").removeClass("is-disabled").show().find(".mdl-checkbox__input").prop("disabled",!1),e.find(".qor-product__action--add,.qor-product__action").toggle(),r.length?r.after(e):e.appendTo(this.$tbody),this.hiddenVariantsID=n.without(this.hiddenVariantsID,t)),i.removeClass(V+" "+D).find(".qor-fieldset__alert").remove())},setCollectionID:function(e){for(var i=this.primaryMeta,a=[],r=0,o=e.length;o>r;r++){for(var s=t(e[r]),d={},l=void 0,c=void 0,h=0,f=i.length;f>h;h++){var u=s.data("variants-"+i[h]);u&&(d=Object.assign({},d,u))}l=n.values(d).map(this.removeSpace).sort(),c=""+k+l.join("_")+"_",d.variantID=c,s.attr("fieldset-varitions-id",c),a.push(d)}this.setTableID(a)},setTableID:function(e){for(var i=this.primaryMeta,a=this.$element.find(_),r=void 0,o=0,s=a.length;s>o;o++){for(var d={},l=t(a[o]),c=0,h=i.length;h>c;c++){var f=i[c],u={},p=t.trim(l.find('[data-variant-type="'+f+'"]').data("variant-value"));p&&(u[f]=p,d=Object.assign({},d,u))}r=n.where(e,d),r.length&&l.attr("variants-id",r[0].variantID)}},removeSpace:function(t){return t.toString().replace(/\s/g,"")},checkSameObj:function(t,e){var i=void 0;return i=t.some(function(t){return n.isEqual(t,e)})},collectObjectKeys:function(t){var e=[],i=t||this.variants;return e=Object.keys(i).filter(function(t){return i[t].length>0})},setTemplate:function(){var t=this.productMetas,e="<tr variants-id=[[variantID]]>",i='<td>\n                                <button type="button" class="mdl-button mdl-js-button qor-product__action--add" style="display: none;">\n                                    Add\n                                </button>\n                                <button type="button" id="qor-product-actions-for-[[variantID]]" class="mdl-button mdl-js-button mdl-button--icon qor-product__action">\n                                    <i class="material-icons">more_vert</i>\n                                </button>\n                                <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu" for="qor-product-actions-for-[[variantID]]">\n                                    <li class="mdl-menu__item" qor-icon-name="Edit">\n                                        <a href="javascript://" class="qor-product__action--edit">Edit</a>\n                                    </li>\n                                    <li class="mdl-menu__item" qor-icon-name="Delete">\n                                        <a href="javascript://" class="qor-product__action--delete">Delete</a>\n                                    </li>\n                                </ul>\n                            </td></tr>';n.each(t,function(t){e=e+"<td data-variant-type="+t+' class="mdl-data-table__cell--non-numeric">[['+t+"]]</td>"}),this.template=""+e+i},deleteVariant:function(e){var i=t(e.target),n=i.closest("tr").attr("variants-id"),a=this,r=i.data();return r.confirm&&window.QOR.qorConfirm(r,function(t){t&&(a.hideRemovedVariants(n),a.showVariantToolbar())}),!1},editVariant:function(e){var i=t(e.target).closest("tr"),n=i.find("td").length,a=i.attr("variants-id"),r=void 0,o=t('<tr class="qor-variant__edit"><td class="normal" colspan='+n+"></td></tr>"),s='<button type="button" class="mdl-button mdl-js-button mdl-button--raised '+w.replace(".","")+'">OK</button>';return i.next("tr.qor-variant__edit").length?!1:a?(r=t('fieldset[fieldset-varitions-id="'+a+'"]'),i.addClass(C).after(o),r.appendTo(o.find("td")).trigger("enable").find(w).remove().end().append(s).show().removeClass("hidden").on(c,B,this.syncCollectionToVariant.bind(this)).on(l,w,this.saveCollevtionEdit.bind(this)).on(h,x,this.syncCollectionToVariant.bind(this)),void this.hidePrimaryMeta(r)):!1},hidePrimaryMeta:function(t){for(var e=this.primaryMeta,i=0,n=e.length;n>i;i++)t.find("[name$="+e[i]+"]").not('[type="hidden"]').closest(".qor-form-section").hide()},syncCollectionToVariant:function(e){var i=t(e.target),n=i.val(),a=i.closest(y).attr("fieldset-varitions-id"),r=t('tr[variants-id="'+a+'"]'),o=i.prop("name").match(/\.\w+$/g)[0].replace(".",""),s=void 0,d=void 0;if(s=r.find('[data-variant-type="'+o+'"]'),i.is("textarea"))if(d=JSON.parse(n),d.length){for(var l="",c=0,h=d.length;h>c;c++)l=l+'<img src="'+d[c].Url+'"/>';s.html(l)}else s.html("");else s.html(n)},saveCollevtionEdit:function(e){var i=t(e.target),n=i.closest(y),a=n.closest("tr");a.prev().removeClass(C).end().remove(),n.appendTo(this.$fieldBlock).off(c,B,this.syncCollectionToVariant.bind(this)).off(l,w,this.saveCollevtionEdit.bind(this)).off(h,x,this.syncCollectionToVariant.bind(this)).hide()},selectVariants:function(e){var i=t(e.target).closest(m),n=i.data("variant-type"),a=e.params.data,r=a.selected,o=a.text||a.title||a.Name,s=a.id,d=n+"s",l=!i.find(".select2-selection__choice").length;return this.ingoreInitChange?!1:(this.variants[d]=this.variants[d]||[],r?this.doSelelct(o,d,n,s):this.doUnselelct(o,d,n,s,l),this.replicatorTemplate=[],void this.initFilter())},doUnselelct:function(t,e,i,a,r){this.variants[e]=this.variants[e].filter(function(e){return e[i]!=t}),this.removeVariants(t,a,i),r?this.renderVariants():this.handleTemplateData(),this.primaryMetaValue=n.reject(this.primaryMetaValue,function(e){return n.isMatch(e,{type:t,meta:i})})},doSelelct:function(t,e,i,n){var a={};a[i]=t,a.id=n.toString(),this.variants[e].push(a),this.renderVariants(),this.primaryMetaValue.push({type:t,meta:i})},removeVariants:function(t,e,i){var a=this.templateData,r={};r[i]=t,r[i+"s_ID"]=e;for(var o=0,s=a.length;s>o;o++){var d=a[o];n.isMatch(d,r)&&this.hideRemovedVariants(d.variantID)}this.showVariantToolbar()},hideRemovedVariants:function(t){var e=this.$tbody.find('tr[variants-id="'+t+'"]'),i=this.$tbody.find(".qor-variant__edit"),n=this.$element.find('fieldset[fieldset-varitions-id="'+t+'"]');e.length&&n.length&&!e.hasClass("is_deleted")&&(this.hiddenVariantsID=this.hiddenVariantsID||[],this.hiddenVariantsID.push(t),i.length&&(this.$element.find(".qor-fieldset--new").before(i.find(".qor-fieldset")),i.remove()),e.addClass(D+" is_deleted").removeClass("is-selected").find(".qor-product__action--add,.qor-product__action").toggle(),e.find("label").removeClass("is-checked").addClass("is-disabled").hide().find(".mdl-checkbox__input").prop({checked:!1,disabled:!0}),e.appendTo(this.$tbody),n.addClass(D).find(".qor-fieldset__alert").remove().end().find(".qor-fieldset__delete").trigger("click").hide())},renderVariants:function(){var t=void 0;return t=this.collectObjectKeys(),0===t.length?void this.$tbody.find("tr:not(.qor-product-init)").hide():(this.variantsKey=t,void this.convertVariantsData())},convertVariantsData:function(){this.handleTemplateData(),this.renderVariantsTable()},handleTemplateData:function(){var t=[],e=this.variantsKey,i=this.variants;if(this.templateData=[],n.each(e,function(e){t.push(i[e].length)}),1===e.length)for(var a=i[e[0]],r=0,o=a.length;o>r;r++){var s=a[r],d=n.keys(s)[0],l=s[d],c=void 0,h={};h[d]=l,h.id=s.id,c=n.values(h).map(this.removeSpace).sort(),h.variantID=""+k+c.join("_")+"_",this.templateData.push(h)}else this.handleMultipleVariantsData(t,this.generateData.bind(this))},renderVariantsTable:function(){var t=this.$element.find(b),e=void 0;t.removeClass("is-upgraded").removeAttr("data-upgraded").find("tr td:first-child,tr th:first-child").remove(),e=this.checkTemplateData().newObjs,t.trigger("enable").find(".is_deleted label.mdl-checkbox").hide(),this.$tbody.find("."+V).remove(),e.length&&setTimeout(function(){this.doReplicator(e)}.bind(this),500)},doReplicator:function(t){var e=this.$element;this.replicator=this.replicator||e.find(g).data(o),this.replicator.add(null,t,!0),this.$element.find("."+V+M+" .qor-fieldset__delete").trigger("click").hide()},checkTemplateData:function(){var t=this.templateData,e=this.hiddenVariantsID||[],i=[],a=[];this.collectExistVariantsID(),this.$element.find(M+","+_+":not(.qor-product-init)").addClass(V);for(var r=0,o=t.length;o>r;r++){var s=t[r],d=void 0,l=void 0,c=s.variantID;e.length&&(d=n.contains(e,c)),this.existVariantsID.length&&(l=n.contains(this.existVariantsID,c)),d||l?(a.push(s),this.addBackVariants(c)):(this.$tbody.prepend(window.Mustache.render(this.template,s)),i.push(s))}return{oldObjs:a,newObjs:i}},generateData:function(t){for(var e=this.variantsKey,i=this.variants,a=void 0,r={},o=0,s=t.length;s>o;o++){var d=i[e[o]][t[o]];r[e[o]+"_ID"]=d.id,r=Object.assign({},r,d)}delete r.id,a=n.values(r).map(this.removeSpace).sort(),r.variantID=""+k+a.join("_")+"_",this.templateData.push(r)},handleMultipleVariantsData:function(t,e){this.convertMultipleVariantsData(t,e,[],0)},convertMultipleVariantsData:function(t,e,i,n){if(0==t.length)e(i);else{var a=t.slice(1);for(i[n]=0;i[n]<t[0];++i[n])this.convertMultipleVariantsData(a,e,i,n+1)}},addVariantReplicator:function(t,e,i){e=this.syncReplicatorData(e,i),e.attr("fieldset-varitions-id",i.variantID).hide(),this.replicatorTemplate.push(e.prop("outerHTML"))},addVariantReplicators:function(){var i=t("<div></div>"),n=this.$element.find(".qor-product__block"),a=this.replicatorTemplate.join("");i.appendTo(n),e(i[0],a)},syncReplicatorData:function(t,i){for(var n=Object.keys(i),a=0,r=n.length;r>a;a++){var o=t.find("[name$="+n[a]+"]").not('[type="hidden"]'),s=void 0,d=void 0;if(o.length&&o.is("select")){var l=o.find('option[value="'+i.id+'"]');l.length?o.val(i.id):(s=n[a]+"s_ID",d="<option selected value='"+(i.id||i[s])+"'>"+i[n[a]]+"</option>",e(o[0],d))}}return t},addLoading:function(){var e=t(i.TEMPLATE_LOADING);e.appendTo(this.$element.find(g)).trigger("enable")},destroy:function(){this.unbind(),this.$element.removeData(r)}},i.TEMPLATE_FILTER='<li><a href="javascript://" data-filter-type="[[type]]" data-filter-meta=[[number]]>[[type]]</a></li>',i.TEMPLATE_LOADING='<div class="qor-product__loading">\n            <div><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>\n        </div>',i.plugin=function(e){return this.each(function(){var n=t(this),a=n.data(r),o=void 0;if(!a){if(/destroy/.test(e))return;n.data(r,a=new i(this,e))}"string"==typeof e&&t.isFunction(o=a[e])&&o.apply(a)})},t(function(){var n='[data-toggle="qor.variations"]';a.on(d,function(e){i.plugin.call(t(n,e.target),"destroy")}).on(s,function(e){i.plugin.call(t(n,e.target))}).on("beforeEnable.qor.slideout",".qor-slideout",function(){i.fieldsetInits=t(n).find(".qor-fieldset--inits").html(),t(n).find(".qor-fieldset--inits").html("")}).on("afterEnable.qor.slideout",".qor-slideout",function(){e(t(n).find(".qor-fieldset--inits")[0],i.fieldsetInits),a.triggerHandler(s)}).triggerHandler(s)}),i});