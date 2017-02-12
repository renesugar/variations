"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(t){function e(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(a)&&a),this.init()}var i=window._,a=t(document),n="qor.product.variants",r="qor.replicator",s="enable."+n,o="disable."+n,d="click."+n,l="keyup."+n,c="changed.medialibrary",h="added."+r,u="addedMultiple."+r,f=".qor-product__property",p='.qor-product__property select[data-toggle="qor.chooser"]',v=".qor-product__property-selector",m=".qor-product__table tbody",_=".qor-product__table table",b=".qor-product__table tbody tr",g=".qor-product__container",y=".qor-fieldset",q=".qor-fieldset__add",V="qor_variants_id_",D="should_remove",k="is_removed",$="is_current",I=".qor-fieldset--init",T=".qor-fieldset:not(.qor-fieldset--new)",M='input[name*="QorResource.Variations"]:visible',j=".qor-field__mediabox-data",E=".qor-product__button-save",C=".qor-product__bulk-save",w=".qor-product__filter-options";return e.prototype={constructor:e,init:function(){var e=this.$element;this.bind(),this.variants={},this.PrimaryInitMetaData={},this.productMetas=[],this.templateData=[],this.primaryMeta=[],this.existVariantsID=[],this.primaryMetaValue=[],this.$tbody=e.find(m),this.$replicatorBtn=e.find(q),this.$fieldBlock=e.find(".qor-product__container>.qor-field__block"),this.BottomSheets=t("body").data("qor.bottomsheets"),this.initMetas(),this.initPrimaryMeta()},bind:function(){a.on(h,this.addVariantReplicator.bind(this)).on(u,this.addVariantReplicators.bind(this)),this.$element.on("select2:select select2:unselect",p,this.selectVariants.bind(this)).on(d,".qor-product__action--edit",this.editVariant.bind(this)).on(d,".qor-product__action--delete",this.deleteVariant.bind(this)).on(d,".qor-product__filter a",this.filterVariant.bind(this)).on(d,".qor-product__filter-actions__edit",this.bulkEditVariants.bind(this)).on(d,".qor-product__filter-actions__delete",this.bulkDeleteVariants.bind(this)).on(d,"label.mdl-checkbox input:checkbox",this.showBulkEditVariantToolbar.bind(this))},unbind:function(){},initMetas:function(){for(var e=this.$element.find(".qor-product__meta"),i=0,a=e.length;i<a;i++)this.productMetas.push(t(e[i]).data("inputName"));this.setTemplate()},collectExistVariantsID:function(){for(var e=this.$tbody.find("tr:not(."+k+")"),i=0,a=e.length;i<a;i++)this.existVariantsID.push(t(e[i]).attr("variants-id"))},initPrimaryMeta:function(){for(var e=this.$element.find(v),i=this.$element.find(I),a={},n=[],r=void 0,s=0,o=e.length;s<o;s++){var d=[],l=t(e[s]).data("variant-type");if(this.primaryMeta.push(l),i.length){for(var c=0,h=i.length;c<h;c++){var u=t(i[c]),f=u.find("[name$="+l+"]").not('[type="hidden"]'),p={},m={};if(f.is("select")&&f.val()){var _=f.find("option").html();p[l]=_,p.id=f.val(),r=this.checkSameObj(n,p),r||(d.push(p),this.primaryMetaValue.push({type:_})),m[l+"_ID"]=p.id,m[l]=p[l],u.data("variants-"+l,m)}n.push(p)}d.length&&(a[l+"s"]=d)}}this.variants=this.PrimaryInitMetaData=a,this.variantsKey=this.collectObjectKeys(),this.handleTemplateData(),this.initPrimarySelector(),this.primaryMetaValue.length&&this.initFilter(),this.setCollectionID(i)},initPrimarySelector:function(){var e=this.PrimaryInitMetaData,i=Object.keys(e);this.ingoreInitChange=!0;for(var a=0,n=i.length;a<n;a++){for(var r=i[a].slice(0,-1),s=t('[data-variant-type="'+r+'"]').find(".qor-field__input-selector"),o=e[i[a]],d=0,l=o.length;d<l;d++)s.append("<option selected value='"+o[d].id+"'>"+o[d][r]+"</option>");s.trigger("change")}this.ingoreInitChange=!1},initFilter:function(){var t=this.primaryMetaValue,i=this.$element.find(w);i.html("");for(var a=0,n=t.length;a<n;a++)i.append(window.Mustache.render(e.TEMPLATE_FILTER,t[a]))},filterVariant:function(e){var i=t(e.target),a=i.data("filter-type"),n=this.$element.find(_),r=n.find("tr.is-selected"),s=function(){r.length&&(r.find("label.mdl-checkbox").trigger("click"),n.find("th label.mdl-checkbox").removeClass("is-checked").find(".mdl-checkbox__input").prop("checked",!1))};switch(a){case"all":n.find("th label.mdl-checkbox").trigger("click");break;case"none":s();break;default:s(),this.$tbody.find('tr[variants-id*="_'+this.removeSpace(a)+'_"] label.mdl-checkbox').trigger("click")}n.find("label.mdl-checkbox").removeClass("is-focused"),this.showVariantToolbar()},showBulkEditVariantToolbar:function(){setTimeout(this.showVariantToolbar.bind(this),1)},showVariantToolbar:function(){var e=this.$element.find(_).find("tr.is-selected"),i=this.$element.find(".qor-product__filter-actions"),a=e.length,n=[];a?(i.show().find("em").html(a),e.each(function(){n.push(t(this).attr("variants-id"))}),this.selectedVariantsID=n):i.hide()},bulkEditVariants:function(){var e=this.initBulkVariantsForm(),i=this.$tbody.find("tr:first"),a=this.$element.find(".qor-variants__edit"),n=i.find("td").length,r=t('<tr class="qor-variants__edit"><td class="normal" colspan='+n+"></td></tr>"),s='<button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+C.replace(".","")+'">Save</button>';return!a.length&&(i.before(r),void e.appendTo(r.find("td")).show().append(s).trigger("enable").on(d,".qor-product-icon",this.checkBulkEdit.bind(this)).on(d,C,this.saveBulkEdit.bind(this)))},checkBulkEdit:function(e){var i=t(e.target).closest(".qor-product-icon");i.toggleClass("selected")},saveBulkEdit:function(){var e=this.$element.find(".qor-product-icon.selected"),i=[];return e.length?(e.each(function(){var e=t(this).parent().find(M+","+j),a={};e.length&&(e.is(j)?a.isImage=!0:a.isImage=!1,a.name=e.prop("name").match(/\.\w+$/g)[0].replace(".",""),a.value=e.val(),i.push(a))}),void this.syncBulkEditValue(i)):(this.$element.find(".qor-variants__edit").remove(),!1)},syncBulkEditValue:function(t){for(var e=this.selectedVariantsID,i=this.$element,a=0,n=e.length;a<n;a++)for(var r=0,s=t.length;r<s;r++){var o=t[r].name,d=t[r].value,l=void 0,c=this.$tbody.find('tr.is-selected td[data-variant-type="'+o+'"]');t[r].isImage?(l=JSON.parse(d)[0].Url,c.html('<img src="'+l+'"/>')):c.html(d),i.find("#"+e[a]).find("[name$="+o+"]").not('[type="hidden"]').val(d)}this.$element.find(".qor-variants__edit").remove()},bulkDeleteVariants:function(){var e=this.$tbody.find("tr.is-selected");e.hide().addClass("is_removed");for(var i=0,a=e.length;i<a;i++){var n=t(e[i]).attr("variants-id");this.$element.find("#"+n).find(".qor-fieldset__delete").click()}return this.$element.find(".qor-product__filter-actions").hide(),!1},initBulkVariantsForm:function(){var t=this.primaryMeta,e=this.$element.find(".qor-fieldset--new").clone();t.push("Product");for(var i=0,a=t.length;i<a;i++)e.find("[name$="+t[i]+"]").not('[type="hidden"]').closest(".qor-form-section").remove();return e.find(".qor-form-section .qor-field").prepend('<span class="qor-product-icon"><i class="material-icons normal">panorama_fish_eye</i><i class="material-icons selected">check_circle</i></span>'),e.find(".qor-fieldset__delete").remove(),e.prepend("<h2>Bulk Edit</h2>"),e},setCollectionID:function(e){for(var a=this.primaryMeta,n=[],r=0,s=e.length;r<s;r++){for(var o=t(e[r]),d={},l=void 0,c=void 0,h=0,u=a.length;h<u;h++){var f=o.data("variants-"+a[h]);f&&(d=Object.assign({},d,f))}l=i.values(d).map(this.removeSpace).sort(),c=""+V+l.join("_")+"_",d.variantID=c,o.attr("id",c),n.push(d)}this.setTableID(n)},setTableID:function(e){for(var a=this.primaryMeta,n=this.$element.find(b),r=void 0,s=0,o=n.length;s<o;s++){for(var d={},l=t(n[s]),c=0,h=a.length;c<h;c++){var u=a[c],f={},p=l.find('[data-variant-type="'+u+'"]').text();p&&(f[u]=p,d=Object.assign({},d,f))}r=i.where(e,d),r.length&&l.attr("variants-id",r[0].variantID)}},removeSpace:function(t){return t.toString().replace(/\s/g,"")},checkSameObj:function(t,e){var a=void 0;return a=t.some(function(t){return i.isEqual(t,e)})},collectObjectKeys:function(t){var e=[],i=t||this.variants;return e=Object.keys(i).filter(function(t){return i[t].length>0})},setTemplate:function(){var t=this.productMetas,e="<tr variants-id=[[variantID]]>",a='<td>\n                                <button type="button" id="qor-product-actions-for-[[variantID]]" class="mdl-button mdl-js-button mdl-button--icon qor-product__action">\n                                    <i class="material-icons">more_vert</i>\n                                </button>\n                                <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu" for="qor-product-actions-for-[[variantID]]">\n                                    <li class="mdl-menu__item" qor-icon-name="Edit">\n                                        <a href="javascript://" class="qor-product__action--edit">Edit</a>\n                                    </li>\n                                    <li class="mdl-menu__item" qor-icon-name="Delete">\n                                        <a href="javascript://" class="qor-product__action--delete">Delete</a>\n                                    </li>\n                                </ul>\n                            </td></tr>';i.each(t,function(t){e=e+"<td data-variant-type="+t+' class="mdl-data-table__cell--non-numeric">[['+t+"]]</td>"}),this.template=""+e+a},deleteVariant:function(e){var i=t(e.target).closest("tr").attr("variants-id");this.hiddenVariantsID=this.hiddenVariantsID||[],this.hideRemovedVariants(i),this.hiddenVariantsID.push(i)},editVariant:function(e){var i=t(e.target).closest("tr"),a=i.find("td").length,n=i.attr("variants-id"),r=void 0,s=t('<tr class="qor-variant__edit"><td class="normal" colspan='+a+"></td></tr>"),o='<button type="button" class="mdl-button mdl-js-button mdl-button--raised '+E.replace(".","")+'">OK</button>';return!i.next("tr.qor-variant__edit").length&&(!!n&&(r=t("#"+n),i.addClass($).after(s),r.appendTo(s.find("td")).find(E).remove().end().append(o).show().removeClass("hidden").on(l,M,this.syncCollectionToVariant.bind(this)).on(d,E,this.saveCollevtionEdit.bind(this)).on(c,j,this.syncCollectionToVariant.bind(this)),void this.hidePrimaryMeta(r)))},hidePrimaryMeta:function(t){for(var e=this.primaryMeta,i=0,a=e.length;i<a;i++)t.find("[name$="+e[i]+"]").not('[type="hidden"]').closest(".qor-form-section").hide()},syncCollectionToVariant:function(e){var i=t(e.target),a=i.val(),n=i.closest(y).attr("id"),r=t('tr[variants-id="'+n+'"]'),s=i.prop("name").match(/\.\w+$/g)[0].replace(".",""),o=void 0,d=void 0;o=r.find('[data-variant-type="'+s+'"]'),i.is("textarea")?(d=JSON.parse(a)[0].Url,o.html('<img src="'+d+'"/>')):o.html(a)},saveCollevtionEdit:function(e){var i=t(e.target),a=i.closest(y),n=a.closest("tr");n.prev().removeClass($).end().remove(),a.appendTo(this.$fieldBlock).off(l,M,this.syncCollectionToVariant.bind(this)).off(d,E,this.saveCollevtionEdit.bind(this)).off(c,j,this.syncCollectionToVariant.bind(this)).hide()},selectVariants:function(e){var i=t(e.target).closest(v).data("variant-type"),a=e.params.data,n=a.selected,r=a.text||a.title||a.Name,s=a.id,o=i+"s";return!this.ingoreInitChange&&(this.variants[o]=this.variants[o]||[],n?this.doSelelct(r,o,i,s):this.doUnselelct(r,o,i,s),void this.initFilter())},doUnselelct:function(t,e,a,n){this.variants[e]=this.variants[e].filter(function(e){return e[a]!=t}),this.removeVariants(t,n,a),this.handleTemplateData(),this.primaryMetaValue=i.reject(this.primaryMetaValue,function(e){return i.isEqual(e,{type:t})})},doSelelct:function(t,e,i,a){var n={};n[i]=t,n.id=a.toString(),this.variants[e].push(n),this.renderVariants(),this.primaryMetaValue.push({type:t})},removeVariants:function(t,e,a){var n=this.templateData,r={};r[a]=t,r[a+"s_ID"]=e,this.hiddenVariantsID=[];for(var s=0,o=n.length;s<o;s++){var d=n[s],l=void 0;i.isMatch(d,r)&&(l=d.variantID,this.hideRemovedVariants(l),this.hiddenVariantsID.push(l))}},hideRemovedVariants:function(t){var e=this.$tbody.find('tr[variants-id="'+t+'"]'),i=this.$element.find("fieldset#"+t);e.hide().addClass(k),i.addClass(k).find(".qor-fieldset__alert").remove().end().find(".qor-fieldset__delete").trigger("click").hide()},renderVariants:function(){var t=void 0;return t=this.collectObjectKeys(),0===t.length?void this.$tbody.html(""):(this.variantsKey=t,void this.convertVariantsData())},convertVariantsData:function(){this.handleTemplateData(),this.renderVariantsTable()},handleTemplateData:function(){var t=[],e=this.variantsKey,a=this.variants;if(this.templateData=[],i.each(e,function(e){t.push(a[e].length)}),1===e.length)for(var n=a[e[0]],r=0,s=n.length;r<s;r++){var o=n[r],d=i.keys(o)[0],l=o[d],c=void 0,h={};h[d]=l,h.id=o.id,c=i.values(h).map(this.removeSpace).sort(),h.variantID=""+V+c.join("_")+"_",this.templateData.push(h)}else this.handleMultipleVariantsData(t,this.generateData.bind(this))},renderVariantsTable:function(){var t=this.$element.find(_),e=void 0;t.removeClass("is-upgraded").removeAttr("data-upgraded").find("tr td:first-child,tr th:first-child").remove(),e=this.checkTemplateData().newObjs,this.$element.find(b+"."+D).hide(),e.length&&(t.trigger("enable"),this.doReplicator(e))},doReplicator:function(t){var e=this,i=this.$element;this.replicator=this.replicator||i.find(g).data(r),setTimeout(function(){e.replicator.addReplicators(t,e.$replicatorBtn)},500),this.$element.find("."+D+T).find(".qor-fieldset__delete").trigger("click").hide()},checkTemplateData:function(){var e=this.templateData,a=this.hiddenVariantsID||[],n=[],r=[];this.collectExistVariantsID(),this.$element.find(T).addClass(D).end().find(b).addClass(D);for(var s=0,o=e.length;s<o;s++){var d=e[s],l=void 0,c=void 0,h=d.variantID;if(a.length&&(l=i.contains(a,h)),this.existVariantsID.length&&(c=i.contains(this.existVariantsID,h)),l||c){r.push(d);var u=t("#"+h),f=t('tr[variants-id="'+h+'"]');u.removeClass(D+" "+k).find(".qor-fieldset__alert").remove(),f.removeClass(D+" "+k).show()}else this.$tbody.append(window.Mustache.render(this.template,d)),n.push(d)}return{oldObjs:r,newObjs:n}},generateData:function(t){for(var e=this.variantsKey,a=this.variants,n=void 0,r={},s=0,o=t.length;s<o;s++){var d=a[e[s]][t[s]];r[e[s]+"_ID"]=d.id,r=Object.assign({},r,d)}delete r.id,n=i.values(r).map(this.removeSpace).sort(),r.variantID=""+V+n.join("_")+"_",this.templateData.push(r)},handleMultipleVariantsData:function(t,e){this.convertMultipleVariantsData(t,e,[],0)},convertMultipleVariantsData:function(t,e,i,a){if(0==t.length)e(i);else{var n=t.slice(1);for(i[a]=0;i[a]<t[0];++i[a])this.convertMultipleVariantsData(n,e,i,a+1)}},addLoading:function(){t(".qor-product__loading").remove();var i=t(e.TEMPLATE_LOADING);i.appendTo(t(f)).trigger("enable")},addVariantReplicator:function(t,e,i){e.closest(".qor-product__container").length&&(e.attr({"variant-data":JSON.stringify(i),id:i.variantID}).hide(),this.syncReplicatorData(e,i))},addVariantReplicators:function(){t(".qor-product__loading").remove()},syncReplicatorData:function(t,e){for(var i=Object.keys(e),a=0,n=i.length;a<n;a++){var r=t.find("[name$="+i[a]+"]").not('[type="hidden"]'),s=void 0;r.length&&r.is("select")&&r.data("remote-data")&&(s=i[a]+"s_ID",r.append("<option selected value='"+(e.id||e[s])+"'>"+e[i[a]]+"</option>").trigger("change"))}},destroy:function(){this.unbind(),this.$element.removeData(n)}},e.TEMPLATE_FILTER='<li><a href="javascript://" data-filter-type="[[type]]">[[type]]</a></li>',e.TEMPLATE_LOADING='<div class="qor-product__loading">\n            <div><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>\n        </div>',e.plugin=function(i){return this.each(function(){var a=t(this),r=a.data(n),s=void 0;if(!r){if(/destroy/.test(i))return;a.data(n,r=new e(this,i))}"string"==typeof i&&t.isFunction(s=r[i])&&s.apply(r)})},t(function(){var i='[data-toggle="qor.product.variants"]';t(document).on(o,function(a){e.plugin.call(t(i,a.target),"destroy")}).on(s,function(a){e.plugin.call(t(i,a.target))}).triggerHandler(s)}),e});