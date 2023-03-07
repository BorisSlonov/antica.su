
//ОТКРЫЛИ КОРЗИНУ
/* NEW
document.querySelector(".cart-block-title-bar").addEventListener('click', event => {

  ym(6320767,'reachGoal','cart_open');
  ga('send', 'event', 'cart', 'view_cart_page');

}, false);
*/
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

$(function() {


    //Если карточка товара
    if ($('.one_item .card__order').length) 
    {
        var cur_item = $('.one_item .addtocart_block');
        recalc_total(cur_item);
    }
    
    $(document).on('click','.cnt_block__select .current', function(event) {
      		event.preventDefault();
      		$(this).closest('.cnt_block__select').toggleClass('active');
      });
    
    $(document).on('click', '.cnt_block__select ul li', function(event) {
      	event.preventDefault();
      	$(this).closest('.cnt_block__select').find('.current').html($(this).html());
      	$(this).closest('.cnt_block__select').removeClass('active');
      	$(this).siblings('li').removeClass('active');
      	$(this).addClass('active');
    
        var cur_item = $(this).closest('.addtocart_block');
        
        var price_block = $(this).closest('.addtocart_block').find('.addtocart_price .nbsp');
    	var input_value = $(this).closest('.addtocart_block').find('.cnt_block__input');
    	var cur_count = input_value.val();
    	cur_count = parseFloat(cur_count.replace(',','.'));
    
    
    	 var cur_measure = $(this).data('measure');
         
    	 var old_measure = $(cur_item).find('.cnt_block__select .current').data('measure');
         $(cur_item).find('.addtocart').attr('data-measureid',cur_measure);
    
    	  var cnt_block = $(this).closest('.cnt_block');
          var nid = $(cnt_block).data('nid');        	  
    		
    	  var qty = $(cnt_block).data('qty');
    	  var price = $(cnt_block).data('price');
    	  var measure = $(cnt_block).data('measure');
    	  var cur_measure_text = $(cnt_block).find('.cnt_block__select .current').html();
  		  var sizesq = $(cnt_block).data('sizesq');
    	  var boxqty = $(cnt_block).data('boxqty');
    	  var boxmetr = $(cnt_block).data('boxmetr');
    	  if (!qty || qty === null || qty === undefined) qty = 1;
    
    	  $(cur_item).find('.cnt_block__select .current').data('measure', cur_measure);
    
    	  //Меняем данные
    	  if (cur_measure >= 0 && qty && price > 10 && measure >= 0 && sizesq > 0 && boxqty > 0 && boxmetr > 0)
    	  {
    	  		// Меняем на шт.
    	  		if (cur_measure == 1 && old_measure >= 0)
    			{
    				var new_count = 1;
    				if (old_measure == 0) {
    					var new_count = (cur_count / sizesq).toFixed(0);
    					if (new_count < boxqty) new_count = boxqty;
    					else new_count = Math.ceil(new_count/boxqty)*boxqty;
    				}
    				if (old_measure == 4)
    				{
    					var new_count = (cur_count * boxqty).toFixed(0);
    					if (new_count < boxqty) new_count = boxqty;
    					else new_count = Math.ceil(new_count/boxqty)*boxqty;
    				}
    				if (!new_count || new_count == 0 || new_count === undefined || new_count === null) new_count = boxqty;
    
    
    				$(input_value).val(new_count);
    				if (boxqty) var price_new = (price * sizesq).toFixed(2);
    				if (price_new > 1) $(price_block).html("<b>"+price_new+"</b> руб/шт.");
    				$(cnt_block).data('qty',boxqty);
    				$(cnt_block).data('curprice',price_new);
    				$(cur_item).find('.addtocart').attr('data-price',price_new);
    				$(cur_item).find('.addtocart').attr('data-measure','шт.');
                    $(cur_item).find('.item-price').val(price_new);
                    $(cur_item).find('.item-measure').val(1);
    
    			}
    
    			// Меняем на упак.
    			if (cur_measure == 4 && old_measure >= 0)
    			{
    			   var price_new = (price * boxmetr).toFixed(0);
    			   if (price_new > 1) $(price_block).html("<b>"+price_new+"</b> руб/упак.");
    
    				var new_count = 1;
    				if (old_measure == 0) {
    					var new_count = parseFloat(cur_count / boxmetr).toFixed(0);
    					if (new_count < 1) new_count = 1;
    					else new_count = Math.ceil(new_count);
    				}
    				if (old_measure == 1)
    				{
    					var new_count = parseFloat(cur_count / boxqty).toFixed(0);
    					if (new_count < 1) new_count = 1;
    					else new_count = Math.ceil(new_count);
    				}
    				if (!new_count || new_count == 0 || new_count === undefined || new_count === null) new_count = boxqty;
    
    				$(input_value).val(new_count);
    				$(cnt_block).data('qty',"1");
    				$(cnt_block).data('curprice',price_new);
    				$(cur_item).find('.addtocart').attr('data-price',price_new);
    				$(cur_item).find('.addtocart').attr('data-measure','упак.');
                    $(cur_item).find('.item-price').val(price_new);
                    $(cur_item).find('.item-measure').val(4);
    
    			}
    
    	  		// Меняем на м2
    			if (cur_measure == 0 && old_measure >= 0)
    			{
    				var new_count = 1;
                    var price_new = price;
    				if (old_measure == 1) {
    					var new_count = parseFloat(cur_count * sizesq).toFixed(2);
    					if (new_count < boxmetr) new_count = boxmetr;
    					else new_count = parseFloat(Math.ceil(new_count/boxmetr)*boxmetr).toFixed(2);
    				}
    				if (old_measure == 4)
    				{
    					var new_count = parseFloat(cur_count * boxmetr).toFixed(2);
    					if (new_count < boxmetr) new_count = boxmetr;
    					else new_count = parseFloat(Math.ceil(new_count/boxmetr)*boxmetr).toFixed(2);
    				}
    				if (!new_count || new_count == 0 || new_count === undefined || new_count === null) new_count = boxmetr;
    
    				$(input_value).val(new_count);
    				$(price_block).html("<b>"+price_new+"</b> руб/м²");
    				$(cnt_block).data('qty',boxmetr);
    				$(cnt_block).data('curprice',price);
    				$(cur_item).find('.addtocart').attr('data-price',price_new);
    				$(cur_item).find('.addtocart').attr('data-measure','м²');
                    $(cur_item).find('.item-price').val(price_new);
                    $(cur_item).find('.item-measure').val(0);
    
    			}
                
                if ($('.cart__list').length) 
                {
                    shoppingCart.setCountForItem(nid, new_count, cur_measure_text, cur_measure);
                    console.log('Меняем в корзине товар ' + nid + " на кол-во " + new_count + " ед.изм " + cur_measure_text + " ("+cur_measure+")");
                    recalc_cart();
                }
    	 }
         recalc_total(cur_item);
      });
    
      $(document).mouseup(function(e) {
        let button = $('.cnt_block__select, .cnt_block__select *');
        if (!button.is(e.target)) {
          $('.cnt_block__select').removeClass('active');
        }
      });
    
     
      $(document).on('blur', '.cnt_block__btn', function(event) {
        let val = parseInt($(this).val());
        if (val < 1 || isNaN(val)) {
          $(this).val(1);
        } else {
          $(this).val(val);
        }
      });
    
      function recalc_total(cur_item)
      {
    	  var cur_value = $(cur_item).find('.cnt_block__input').val();
    	  var cnt_block = $(cur_item).find('.cnt_block__input').closest('.cnt_block');
    	  var cur_price = parseInt($(cnt_block).data('curprice'));
    
    	  if (cur_value >= 0 && cur_price > 1)
    	  {
    		  var result_sum = (cur_value * cur_price).toFixed(0);
    		   $(cur_item).find('.addtocart_sum .val').html(result_sum + " руб.");
               $(cur_item).find('.addtocart_sum').show();
    	  }
          else $(cur_item).find('.addtocart_sum').hide();
           
    
      }
    
    
    	$(document).on('change', 'input.cnt_block__input', function(event) {
    	    event.preventDefault();
    		var cur_item = $(this).closest('.addtocart_block');
            var cur_val = $(this).val();
    		cur_val = parseFloat(cur_val.replace(',','.'));
    
    		var cur_measure = $(cur_item).find('.cnt_block__select .current').data('measure');
            var cur_measure_text = $(cur_item).find('.cnt_block__select .current').html();
    		var cnt_block = $(this).closest('.cnt_block');
            var nid = $(cnt_block).data('nid');        	  
    		var qty = $(cnt_block).data('qty');
    		var price = $(cnt_block).data('price');
    		var measure = $(cnt_block).data('measure');
    		var sizesq = $(cnt_block).data('sizesq');
    		var boxqty = $(cnt_block).data('boxqty');
    		var boxmetr = $(cnt_block).data('boxmetr');
    
    		if (cur_measure == 0) qty = boxmetr;
    		if (cur_measure == 1) qty = boxqty;
    		if (cur_measure == 4) qty = 1;
    		if (!qty || qty === null || qty === undefined) qty = 1;
    
    		if (qty > 0 && cur_val > 0)  cur_val = Math.ceil(cur_val/qty)*qty;
    		if (cur_val < qty && qty > 0)  cur_val = qty;
    		$(this).val(cur_val);
    
    		recalc_total(cur_item);
            
            //Если в корзине
            if ($('.cart__list').length) 
            {
                shoppingCart.setCountForItem(nid, cur_val, cur_measure_text, cur_measure);
                console.log('Меняем в корзине товар ' + nid + " на кол-во " + cur_val + " ед.изм " + cur_measure_text + " ("+cur_measure+")");
                recalc_cart();
            }
            
    	});
    
      $(document).on('click','button.cnt_block__btn', function(event) {
              event.preventDefault();
        	  var $parent = $(this).closest('.cnt_block');
              var cur_item = $(this).closest('.addtocart_block');
                
        	  var cur_measure = $(cur_item).find('.cnt_block__select .current').data('measure');
              var cur_measure_text = $(cur_item).find('.cnt_block__select .current').html();
    		
        	  var cnt_block = $(this).closest('.cnt_block');
        	  var nid = $(cnt_block).data('nid');
        	  var qty = $(cnt_block).data('qty');
        	  var price = $(cnt_block).data('price');
        	  var measure = $(cnt_block).data('measure');
        	  var sizesq = $(cnt_block).data('sizesq');
        	  var boxqty = $(cnt_block).data('boxqty');
        	  var boxmetr = $(cnt_block).data('boxmetr');
        
        	  if (cur_measure == 0) qty = boxmetr;
        	  if (cur_measure == 1) qty = boxqty;
        	  if (cur_measure == 4) qty = 1;
        	  if (!qty || qty === null || qty === undefined) qty = 1;
        
        
        	  //var qty = parseFloat($($parent).data('qty'));
              //if (!qty || qty === null || qty === undefined) qty = 1;
        
              var $input = $parent.find('.cnt_block__input');
              var val = parseFloat($input.val());
              var inpisFloat = false;
              if (val.toString().search(/[.]/) != -1) {
              	inpisFloat = true;
              }
            if ($(this).hasClass('plus')) {
              $input.val(inpisFloat?((val + qty).toFixed(2)):(val + qty));
            }
            if ($(this).hasClass('minus'))
        	{
              if (val > 1) {
        	      $input.val(inpisFloat?((val - qty).toFixed(2)):(val - qty));
              }else{
                  $input.val(0);
              }
            }
        
            if ($input.val() < qty)  $input.val(qty);
            recalc_total(cur_item);
            
            
            //Если в корзине
            if ($('.cart__list').length) 
            {
                shoppingCart.setCountForItem(nid, $input.val(), cur_measure_text, cur_measure);
                console.log('Меняем в корзине товар ' + nid + " на кол-во " +  $input.val() + " ед.изм " + cur_measure_text + " ("+cur_measure+")");
                recalc_cart();
            }
      });


    var manager = getParameterByName('manager');
    if (manager) $.fancybox.open({ src: '#popup-qrcod' });

});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function getcoupon()
{
    var coupon = document.querySelector('.coupon');
    if (coupon) ajax({
        type: "POST",
        url: "/sites/all/scripts/find_coupon.php",
        data: { coupon: coupon.value },
        error: function(){
            new Noty({ text: 'Купон на скидку не найден', type: 'error', timeout: 3000,   theme: 'nest' }).show();
        },
        success: function(data){
            if (data) {
                var data = JSON.parse(data);
                var status = data.status;

                if (data && status == 1) {
                    var designer_id = Number(data.coupon.designer_id);
                    var skidka = Number(data.coupon.coupon_value);


                    if (status == 1 && skidka > 0) {
                        new Noty({
                            text: 'Скидка по купону применена',
                            type: 'success',
                            timeout: 3000,
                            theme: 'nest'
                        }).show();

                        var s = document.getElementById('s');
                        if (skidka && skidka > 0 && s) s.value = skidka;

                        var d = document.getElementById('d');
                        if (designer_id && designer_id > 0 && d) d.value = designer_id;

                        var coupon = document.querySelector('.coupon');

                        recalc_cart();
                        var but = document.getElementById('find_coupon');
                        if (but) but.style.display = 'none';

                        ga('send', 'event', 'callback', 'coupon');
                        yaCounter6320767.reachGoal('coupon');

                    } else new Noty({
                        text: 'Купон на скидку не найден',
                        type: 'error',
                        timeout: 3000,
                        theme: 'nest'
                    }).show();
                    //setTimeout(function(){   var e = document.querySelector(".s-lightbox-closer"); if (e) e.click();    },2000);
                }
                else new Noty({
                    text: 'Купон на скидку не найден',
                    type: 'error',
                    timeout: 3000,
                    theme: 'nest'
                }).show();
            }
        }
    });
}



window.addEventListener('keydown',function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13)
    {
        if(e.target.classList.contains('coupon'))
        {
            e.preventDefault();
            getcoupon();
        }

        if(e.target.nodeName=='INPUT'&&e.target.type=='text')
        {
            e.preventDefault();
            return false;
        }
    }
},true);

//Если есть данные в форме то делаем активные поля для верстки
var order = document.querySelector(".order");
if (order) {
    var els = document.querySelectorAll(".form__field");
    if (els)
        for (const el of els) {
            var input = el.querySelector('input');
            if (input && input.value.length > 0) el.classList.add("hasData");

            var input = el.querySelector('textarea');
            if (input && input.value.length > 0) el.classList.add("hasData");
        }
}



//Ввод купона
var find_coupon = document.getElementById('find_coupon');
if (find_coupon)
{
    find_coupon.addEventListener('click',function(e)
    {
        var coupon = document.querySelector('.coupon');
        if (coupon && coupon.value.length > 3)
        {
            getcoupon();

        }
    });

}

const input_coupon = document.querySelector('.coupon');
    if (input_coupon) {
        input_coupon.addEventListener("keyup", (event) => {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }

            var coupon = input_coupon.value;
            if (coupon && coupon.length > 0)
            {
                var but = document.getElementById('find_coupon');
                if (but) but.style.display = 'inline-block';
            }

        });
    }


function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function displayFavourite()
{
    var goodsArray = favouriteGoods.listCart();
    var collectsArray = favouriteCollects.listCart();
    var output = "";
    var count = 0;

    var new_prices = [];
    ajax({
        type: "POST",
        data: { goodsArray: JSON.stringify(goodsArray), collectsArray: JSON.stringify(collectsArray)  },
        url: "/sites/all/scripts/get_favourite.php",
        success: function(data){
            data = JSON.parse(data);
            var goods_out = data.goods_out;
            var goods_count = data.goods_count;
            var collects_out = data.collects_out;
            var collects_count = data.collects_count;

            if (goods_out)
            {
                if (document.getElementById('favourite_goods')) document.getElementById('favourite_goods').innerHTML = goods_out;
                active_favourite();
            }
            else if (document.getElementById('favourite_goods_title'))
            {
                document.getElementById('favourite_goods_title').style.display = 'none';
                document.getElementById('favourite_goods').style.display = 'none';
            }
                
            if (collects_out)
            {
                if (document.getElementById('favourite_collects')) document.getElementById('favourite_collects').innerHTML = collects_out;
                active_favourite();
            } 
            else if (document.getElementById('favourite_collects_title') && collects_count == 0) document.getElementById('favourite_collects_title').style.display = 'none';

            $('.cnt_block__btn').on('click', function(event) {
                var $parent = $(this).closest('.cnt_block');
                var $input = $parent.find('.cnt_block__input');
                var val = parseFloat($input.val());
                var inpisFloat = false;
                    
                    if (val.toString().search(/[.]/) != -1) {
                        inpisFloat = true;
                    }
                    if ($(this).hasClass('plus')) {
                        $input.val(inpisFloat?((val + 1).toFixed(2)):(val + 1));
                    }
                    if ($(this).hasClass('minus'))
                    {
                        if (val > 1) {
                            $input.val(inpisFloat?((val - 1).toFixed(2)):(val - 1));
                        }else{
                            $input.val(0);
                        }
                    }
            });
        },
        error: function(data) {
        }
    });
}


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    var count = 0;


    //Проверка цен на актуальность
    var nids_array = [];
    for (var i in cartArray)
    {
        var nid = cartArray[i].nid;
        var count = parseFloat(cartArray[i].count).toFixed(2);
        var measure = cartArray[i].measure;
        var measure_id = cartArray[i].measure_id;

        if (nid > 0) {
            nids_array.push(nid);
        }
    }

    var new_prices = [];
    ajax({
        type: "POST",
        data: { cartArray: JSON.stringify(cartArray) },
        url: "/sites/all/scripts/check_cart_prices.php",
        success: function(data){
            data = JSON.parse(data);
            var new_prices = data.prices;
            var goods_out = data.goods_out;

            if (goods_out)
            {
                if (document.querySelector('#cart-checkout .cart__list')) document.querySelector('#cart-checkout .cart__list').innerHTML = goods_out;
                recalc_cart();
            }

            //cart_events();

            if (new_prices)
            {
                for(var i in cartArray) {
                    //Проверяем цены
                    if (new_prices) if (new_prices[cartArray[i].nid]) {
                        //console.log("Товар " + cartArray[i].nid + " цена корзины " + cartArray[i].price + " цена новая " + new_prices[cartArray[i].nid])
                        if (new_prices[cartArray[i].nid] > 1 && new_prices[cartArray[i].nid] !=  cartArray[i].price)
                        {
                            //  console.log("Меняем цену");
                            cartArray[i].price = new_prices[cartArray[i].nid];

                            cartArray[i].total = (new_prices[cartArray[i].nid] * parseFloat(cartArray[i].count)).toFixed(2);
                        }
                    }
                }
            }

            //var viewer = new slimLightbox();

        },
        error: function(data) {

        }
    });

    recalc_cart();

}



function recalc_cart()  {

    var checkout = document.getElementById("checkout");
    if (checkout) {
        // Обходим все товары
        var sel = document.getElementById('s');
        if (sel) var s = sel.value;
        var del = document.getElementById('d');
        if (del) del.value;

        var totalCart = 0;
        var totalGoods = 0;
        var skid = 0;
        var els = document.querySelectorAll(".item-count");
        if (els)
            for (const el of els) {
                var nid = el.closest('.cnt_block').getAttribute('data-nid');
                var price = el.closest('.cnt_block').querySelector('.item-price').value;
                var count = el.value;
                count = Number(count.replace(/,/g, '.'));

                var good_summ = price * count;
                good_summ = Number(good_summ.toFixed(0));

                var cur_item = el.closest('.cart__itm');
                if (cur_item && cur_item.querySelector('.good_summ')) {
                    cur_item.querySelector('.good_summ').innerHTML = good_summ;
                }


                totalGoods += price * count;
            }

        totalGoods = Number(totalGoods.toFixed(0));
        totalCart = totalGoods;

        if (s && s > 0) {
            skid = (totalGoods * s / 100);
            skid = Number(skid.toFixed(0));

            var sk = document.getElementById("cart-total-skidka");
            if (sk) sk.innerHTML = "-" + skid + " руб";


            var el = document.getElementById("cart-goods-summ");
            if (el && totalCart) el.innerHTML = totalGoods + " руб.";

            totalCart = totalCart - skid;

            var but = document.getElementById('block_skidka');
            if (but) but.style.display = 'block';
        }

        var el = document.getElementById("cart-total-summ");
        if (el && totalCart) el.innerHTML = totalCart + " руб.";
        var el = document.getElementById("total_summ");
        if (el && totalCart) el.value = totalCart;

        if (totalGoods >= 10000)
        {
            var el = document.getElementById("min-order");
            if (el) el.style.display = 'none';
        }
        else
        {
            var el = document.getElementById("min-order");
            if (el) el.style.display = 'block';
        }

    }
    var c = document.querySelector('#cart-count');
    if (c) {
        var goodsCount = shoppingCart.goodsCount();
        c.innerHTML = goodsCount;
        show(c);
    }

    var c = document.querySelector('#favourite-count');
    if (c) {
        var goods = Number(favouriteGoods.goodsCount());
        var collects = Number(favouriteCollects.goodsCount());
        c.innerHTML = goods + collects;
        show(c);
    }
}






//ЗАКАЗ КОРЗИНЫ
var el = document.getElementById("checkout");
if (el) document.getElementById("checkout").addEventListener("submit", function(e){

        e.preventDefault();
        var el = document.querySelector(".checkout .button");
        if (el) el.disabled = true;

        var yclid = '';
        ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

        var phone = document.querySelector('.checkout  .client_phone').value;
        var form_el = document.querySelector('.checkout ');
        if (form_el)
        {
            var form = new FormData(form_el);
            var form_data = serializeForm(form)
        }

        const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
        form_data = form_data + "&yclid=" + yclid;

        if (phone)
        {
            ajax({
                type: "POST",
                url: "/sites/all/scripts/site_request_new.php",
                datajson: form_data,
                error: function(){
                    var status = data.status;
                    new Noty({ text: 'Ошибка создания заказа', type: 'error', timeout: 5000,   theme: 'nest' }).show();

                    var el = document.querySelector("#checkout .button");
                    if (el) el.disabled = false;
                },
                success: function(data){

                    var data = JSON.parse(data);
                    var status = Number(data.status);
                    var doc_id = data.doc_id; 

                    if (status == 1)
                    {
                        new Noty({ text: 'Заказ успешно создан', type: 'success', timeout: 5000,   theme: 'nest' }).show();
                        var el = document.querySelector("#checkout .button");
                        if (el) el.disabled = true;

                        if (doc_id)
                        {
                            var c = document.querySelector('.order');
                            if (c) c.innerHTML = '';

                            var c = document.querySelector('.order_form_title');
                            if (c) c.innerHTML = '';

                            var c = document.querySelector('.cart__list');
                            if (c) c.innerHTML = '';

                            var c = document.querySelector('.page-title');
                            if (c) c.innerHTML = 'Заказ оформлен! Номер вашего заказа: <strong>'+doc_id+'</strong>';

                            shoppingCart.clearCart();
                            //window.localStorage.setItem('favouriteGoods',"");
                            recalc_cart();
                            
                            document.querySelector('body').scrollIntoView({
                                     behavior: 'smooth'
                            }); 
                        }

                        ga('send', 'event', 'cart', 'send_order');
                        ym(6320767,'reachGoal','checkout_complete');
                        new_lead('checkout_complete', phone);

                        /* Заказ завершен */
                        ///window.SalesNinja.reachGoal('481c2ccc-34c5-45bb-8724-0503dee05295');

                        //Digi
                        /*
                        var cartArray = shoppingCart.listCart();
                        var productarray = [];
                        var summ = 0;
                        for(var i in cartArray) {

                            var product = {
                                    productId: cartArray[i].nid,
                                    productName: cartArray[i].name,
                                    price: cartArray[i].price,
                                    quantity: parseFloat(cartArray[i].count).toFixed(2),
                                    subtotal: parseFloat(cartArray[i].count * cartArray[i].price).toFixed(2)
                            };
                            var summ = summ + parseInt(cartArray[i].count * cartArray[i].price);
                            productarray.push(product);

                         }


                        Digi.api.sendOrderSuccessViewEvent({
                            cartId: (function () {
                                if (
                                    document.cookie.split(";").filter(function (i) {
                                        return i.match("DIGI_CARTID");
                                    })[0]
                                ) {
                                    return +document.cookie
                                        .split(";")
                                        .filter(function (i) {
                                            return i.match("DIGI_CARTID");
                                        })[0]
                                        .split("=")[1];
                                } else 0;
                            })(),
                            subtotal: parseInt(summ),
                            shippingCost: 0,
                            total: parseInt(summ),
                            cartItems: productarray,
                            orderId: parseInt(doc_id),
                        });
                        */


                    }
                    else
                    {
                        new Noty({ text: 'Ошибка создания заказа', type: 'error', timeout: 5000,   theme: 'nest' }).show();

                        var el = document.querySelector("#checkout .button");
                        if (el) el.disabled = false;
                    }


                }
            });
        }
        else {
            new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

            var el = document.querySelector(" #checkout .button");
            if (el) el.disabled = false;


        }


});



//СЛУШАЕМ ЛЮБЫЕ КЛИКИ
document.addEventListener('click',function(e)
{
    //Клик по e-mail
    if(e.target.classList.contains('email_link')) {
        var href = e.target.getAttribute('href');
        if (href) href = href.replace('mailto:','');
        new_lead('click_email', '','',href);

    }

  //Клик по телефону
  if(e.target.classList.contains('phone_link')) {
      var href = e.target.getAttribute('href');
      if (href) href = href.replace('tel:+7','8');
      if (href) href = href.replace('tel:','');
      if (href) href = href.replace('+','');
      new_lead('click_phone', '','',href);

  }

        //Купить в 1 клик
  if(e.target && (e.target.classList.contains('shortcard__buy_click') || (e.target.parentNode && e.target.parentNode.classList.contains('shortcard__buy_click')) || (e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('shortcard__buy_click')))) {

      var nid = e.target.closest('.shortcard__buy_click').getAttribute('data-nid');
      if (nid > 0) {
          var measure = e.target.closest('.shortcard__buy_click').getAttribute('data-measure');
          var name = e.target.closest('.shortcard__buy_click').getAttribute('data-name');
          var price = Number(e.target.closest('.shortcard__buy_click').getAttribute('data-price'));
          var img = e.target.closest('.shortcard__buy_click').getAttribute('data-img');

          var form = document.getElementById("oneclick-form");
          if (form) {
              document.querySelector(".one-click-img").innerHTML = "<img src='" + img + "'/>";
              document.querySelector(".one-click-name").innerHTML = "Артикул: " + nid + "<br/>" + name;

          }

          if (nid) document.querySelector('.form-good_nid').value = nid;
          else document.querySelector('.form-good_nid').value = '';
      }

   }



    //В корзину
  if(e.target && (e.target.classList.contains('addtocart') || (e.target.parentNode && e.target.parentNode.classList.contains('addtocart')) || (e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('addtocart'))))
  {

        var nid = e.target.closest('.addtocart').getAttribute('data-nid');
        if (nid > 0)
        {
            ym(6320767, 'reachGoal', 'addtocard');
            ga('send', 'event', 'cart', 'add_to_cart');

            e.target.innerHTML = '<svg width="26" height="26" class="svg-ico svg-ico-cart"><use xlink:href="/sites/all/themes/antica_mini/img/sprite.svg#ico-cart"></use></svg><span class="cart-text">Добавлен</span>';

            var measure_id = e.target.closest('.addtocart').getAttribute('data-measureid');
            var measure = e.target.closest('.addtocart').getAttribute('data-measure');
            var name = e.target.closest('.addtocart').getAttribute('data-name');
            var price = Number(e.target.closest('.addtocart').getAttribute('data-price'));
            var img = e.target.closest('.addtocart').getAttribute('data-img');

            var count = e.srcElement.closest('.product').querySelector('.cnt_block__input').value;
            if (count === undefined) count = 1;
            else count = Number(count.replace(/,/g, '.'));

            console.log("Добавляем в корзину " + nid + " " + name + " по " + price + " кол-во " + count + " " + measure_id);


            if (count > 0) {
                new Noty({text: 'Товар добавлен в корзину', timeout: 1000, theme: 'nest'}).show();
                shoppingCart.addItemToCart(nid, count, name, price, measure, img, measure_id);
                recalc_cart();

            } else {
                new Noty({
                    text: 'Введено некорректное количество товара',
                    type: 'error',
                    timeout: 2000,
                    theme: 'nest'
                }).show();
            }
        }
  }

    //Избранные коллекции
    if(e.target && (e.target.classList.contains('like-collect') || (e.target.parentNode && e.target.parentNode.classList.contains('like-collect')) || (e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('like-collect'))))
    {
        var collect = e.target.closest('.collect');
        if (collect) var like = collect.querySelector('.btn-liked');

        if (like && like.classList.contains('active'))
        {
            //Удаляем из избранного
            if (e.target.closest('.collect')) var tid = e.target.closest('.collect').getAttribute('data-tid');
            if (tid > 0) {
                if (favouriteCollects) favouriteCollects.removeItemFromCart(tid);
                new Noty({text: 'Убрали из избранного', type: 'success', timeout: 2000, theme: 'nest'}).show();
                like.classList.remove('active');

                var el = document.getElementById('block-favourites');
                if (el)
                {
                    e.target.closest('.collect').remove();
                }
            }

        }
        else if (like) {
            //Добавляем в избранное
            if (e.target.closest('.collect')) var tid = e.target.closest('.collect').getAttribute('data-tid');
            if (tid > 0) {
                if (favouriteCollects) favouriteCollects.addItemToCart(tid);
                new Noty({text: 'Добавили в избранное',  type: 'success', timeout: 2000, theme: 'nest'}).show();
                like.classList.add('active');
            }
        }

        var c = document.querySelector('#favourite-count');
        if (c) {
            var goods = Number(favouriteGoods.goodsCount());
            var collects = Number(favouriteCollects.goodsCount());
            c.innerHTML = goods + collects;
            show(c);
        }
        //if (collect > 0) {
        //favoriteCollects.addItemToCart(collect);
        //}
    }



    //Избранные товары
  if(e.target && (e.target.classList.contains('btn-liked') || (e.target.parentNode && e.target.parentNode.classList.contains('btn-liked')) || (e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('btn-liked'))))
  {
      var product = e.target.closest('.product');
      if (product) var like = product.querySelector('.btn-liked');

      if (like && like.classList.contains('active'))
      {
          //Удаляем из избранного
          if (e.target.closest('.product')) var nid = e.target.closest('.product').getAttribute('data-nid');
          if (nid > 0) {
              if (favouriteGoods) favouriteGoods.removeItemFromCart(nid);
              new Noty({text: 'Убрали из избранного', type: 'success', timeout: 2000, theme: 'nest'}).show();
              like.classList.remove('active');

              var el = document.getElementById('block-favourites');
              if (el)
              {
                  e.target.closest('.product').remove();
              }
          }

      }
      else if (like) {
          //Добавляем в избранное
          if (e.target.closest('.product')) var nid = e.target.closest('.product').getAttribute('data-nid');
          if (nid > 0) {
              if (favouriteGoods) favouriteGoods.addItemToCart(nid);
              new Noty({text: 'Добавили в избранное',  type: 'success', timeout: 2000, theme: 'nest'}).show();
              like.classList.add('active');
          }
      }

      var c = document.querySelector('#favourite-count');
      if (c) {
          var goods = Number(favouriteGoods.goodsCount());
          var collects = Number(favouriteCollects.goodsCount());
          c.innerHTML = goods + collects;
          show(c);
      }
      //if (collect > 0) {
          //favoriteCollects.addItemToCart(collect);
      //}
  }

  // +1
  if(e.target && e.target.classList.contains('plus-item'))
  {

          var nid = e.target.closest('.cnt_block').getAttribute('data-nid');
          if (nid) {
              var count = document.querySelector('[name="count[' + nid + ']"]').value;
              if (count) count = Number(count.replace(/,/g, '.'));

              var new_count = count + 1;
              if (new_count >= 0) {
                  if (isFloat(new_count)) new_count = parseFloat(new_count).toFixed(4);
                  else new_count = Number(new_count).toFixed(0);

                  document.querySelector('[name="count[' + nid + ']"]').value = new_count;
              }

              shoppingCart.addItemToCart(nid, 1);
              //console.log("Прибавляем");
              //displayCart();
              recalc_cart();
          }

  }


  // -1
  if(e.target && e.target.classList.contains('minus-item'))
  {
      var nid = e.target.closest('.cnt_block').getAttribute('data-nid');
      if (nid)
      {
          var count = document.querySelector('[name="count['+nid+']"]').value;
          if (count) count = Number(count.replace(/,/g, '.'));

          var new_count = count - 1;
          if (new_count >= 0)
          {
              if (isFloat(new_count)) new_count = parseFloat(new_count).toFixed(4);
              else new_count = Number(new_count).toFixed(0);

              document.querySelector('[name="count['+nid+']"]').value = new_count;
          }

          shoppingCart.removeItemFromCart(nid);

          //displayCart();
          recalc_cart();
      }
  }


  // Delete item button
  if(e.target && (e.target.className == 'delete-item' || (e.target.parentNode && e.target.parentNode.className == 'delete-item') || (e.target.parentNode.parentNode && e.target.parentNode.parentNode.className == 'delete-item')))
  {
      var nid = e.target.closest('.cart__itm').getAttribute('data-nid');
        if (nid) {
            shoppingCart.removeItemFromCartAll(nid);
            e.target.closest('.cart__itm').remove();
            //displayCart();
            recalc_cart();
        }
  }

    //QR код пришли в салон создание заявки
    if(e.target && e.target.id== 'button-qrcod')
    {
        e.preventDefault();

        var el = document.querySelector("#qrcod .btn");
        if (el) el.disabled = true;

        var form_el = document.getElementById('qrcod-form');
        if (form_el)
        {
            var form = new FormData(form_el);
            var form_data = serializeForm(form)
        }

        var yclid = '';
        ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });
        form_data = form_data + "&yclid=" + yclid;

        if (form_data)
        {
            //form_data = form_data + '&nid=' + nid;
            ajax({
                type: "POST",
                url: "/sites/all/scripts/site_request_new.php",
                datajson: form_data,
                error: function(){
                    var status = data.status;
                    new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 5000,   theme: 'nest' }).show();
                },
                success: function(data){
                    if (data) {
                        var data = JSON.parse(data);

                        var status = Number(data.status);
                        var doc_id = data.doc_id;

                        if (status == 1){
                            new Noty({ text: 'Заявка успешно отправлена', type: 'success', timeout: 3000,   theme: 'nest' }).show();
                            //ga('send', 'event', 'callback', 'call_from_header');
                            yaCounter6320767.reachGoal('showroom');
                            new_lead('showroom', '', '', yclid);

                            /* Заказ звонка */
                            //window.SalesNinja.reachGoal('69428ead-deee-44e1-a623-cd9c7e11d9a2');
                        }
                        else new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
                        setTimeout(function(){   var e = document.querySelector("#popup-qrcod .fancybox-close-small"); if (e) e.click();    },2000);

                    }
                }
            });
        }
        else new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

        var el = document.querySelector("#call-form .btn");
        if (el) el.disabled = false;
    }

  //ЗАКАЗАТЬ ЗВОНОК
  if(e.target && e.target.id== 'button-call')
  {
      e.preventDefault();

      var el = document.querySelector("#call-form .btn");
      if (el) el.disabled = true;

      var form_el = document.getElementById('call-form');
      if (form_el)
      {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
      }

      var yclid = '';
      ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

      var phone = document.querySelector('#call-form .client_phone').value;
        const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
        form_data = form_data + "&yclid=" + yclid;

      if (phone && form_data)
      {
        //form_data = form_data + '&nid=' + nid;
        ajax({
          type: "POST",
          url: "/sites/all/scripts/site_request_new.php",
          datajson: form_data,
          error: function(){
            var status = data.status;
            new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 5000,   theme: 'nest' }).show();
          },
          success: function(data){
            if (data) {
              var data = JSON.parse(data);

              var status = Number(data.status);
              var doc_id = data.doc_id;

              if (status == 1){
                new Noty({ text: 'Заявка успешно отправлена', type: 'success', timeout: 3000,   theme: 'nest' }).show();
                ga('send', 'event', 'callback', 'call_from_header');
                yaCounter6320767.reachGoal('callme');
                new_lead('callme', phone);

                  /* Заказ звонка */
                  //window.SalesNinja.reachGoal('69428ead-deee-44e1-a623-cd9c7e11d9a2');
              }
              else new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
              setTimeout(function(){   var e = document.querySelector("#popup-callback .fancybox-close-small"); if (e) e.click();    },2000);
 
            }
          }
        });
      }
      else new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

      var el = document.querySelector("#call-form .btn");
      if (el) el.disabled = false;
  }


    //ЗАКАЗАТЬ РАСКЛАДКУ
  if(e.target && e.target.id== 'button-3draskl')
  {
      e.preventDefault();

      var el = document.querySelector("#popup-3draskl .btn");
      if (el) el.disabled = true;

      var form_el = document.getElementById('3draskl-form');
      if (form_el)
      {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
      }

      var yclid = '';
      ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

      var phone = document.querySelector('#popup-3draskl .client_phone').value;
        const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
      form_data = form_data + "&yclid=" + yclid;

      if (phone && form_data)
      {
        //form_data = form_data + '&nid=' + nid;
        ajax({
          type: "POST",
          url: "/sites/all/scripts/site_request_new.php",
          datajson: form_data,
          error: function(){
            var status = data.status;
            new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
          },
          success: function(data){
            if (data) {
              var data = JSON.parse(data);

              var status = Number(data.status);
              var doc_id = data.doc_id;

              if (status == 1){
                new Noty({ text: 'Заявка успешно отправлена. Ожидайте пожалуйста звонка.', type: 'success', timeout: 5000,   theme: 'nest' }).show();
                ga('send', 'event', 'callback', 'call_from_header');
                yaCounter6320767.reachGoal('3draskl');
                new_lead('3draskl', phone);
                  /* Заказ звонка */
                  //window.SalesNinja.reachGoal('69428ead-deee-44e1-a623-cd9c7e11d9a2');
              }
              else new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
              setTimeout(function(){   var e = document.querySelector("#popup-3draskl .fancybox-close-small"); if (e) e.click();    },2000);
 
            }
          }
        });
      }
      else new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

      var el = document.querySelector("#popup-3draskl .btn");
      if (el) el.disabled = false;
  }

    //ЗАКАЗАТЬ РАСКЛАДКУ ОТКРЫТАЯ ФОРМА
    if(e.target && e.target.id== 'button-3draskl-open')
    {
        e.preventDefault();

        var el = document.getElementById("button-3draskl-open");
        if (el) el.disabled = true;

        var form_el = document.getElementById('3draskl-form-open');
        if (form_el)
        {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
        }

        var yclid = '';
        ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

        var phone = document.getElementById('3draskl-form-open').getElementsByClassName('client_phone');
        const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
        form_data = form_data + "&yclid=" + yclid;

        if (phone[0].value && form_data)
        {
        form_data = form_data + '&nid=' + nid;
        ajax({
            type: "POST",
            url: "/sites/all/scripts/site_request_new.php",
            datajson: form_data,
            error: function(){
            var status = data.status;
            new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
            },
            success: function(data){
            if (data) {
                var data = JSON.parse(data);

                var status = Number(data.status);
                var doc_id = data.doc_id;

                if (status == 1){
                new Noty({ text: 'Заявка успешно отправлена. Ожидайте пожалуйста звонка.', type: 'success', timeout: 5000,   theme: 'nest' }).show();
                ga('send', 'event', 'callback', 'call_from_header');
                yaCounter6320767.reachGoal('3draskl');
                new_lead('3draskl', phone);
                
                    /* Заказ звонка */
                    //window.SalesNinja.reachGoal('69428ead-deee-44e1-a623-cd9c7e11d9a2');
                }
                else new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
    
            }
            }
        });
        }
        else new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

        var el = document.getElementById("button-3draskl-open");
        if (el) el.disabled = false;
    }



    //ЗАКАЗАТЬ ВИДЕО
  if(e.target && e.target.id== 'button-video')
  {
      e.preventDefault();

      var el = document.querySelector("#popup-video .btn");
      if (el) el.disabled = true;

      var form_el = document.getElementById('video-form');
      if (form_el)
      {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
      }

      var yclid = '';
      ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

      var phone = document.querySelector('#popup-video .client_phone').value;
        const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
        form_data = form_data + "&yclid=" + yclid;

      if (phone && form_data)
      {
        //form_data = form_data + '&nid=' + nid;
        ajax({
          type: "POST",
          url: "/sites/all/scripts/site_request_new.php",
          datajson: form_data,
          error: function(){
            var status = data.status;
            new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
          },
          success: function(data){
            if (data) {
              var data = JSON.parse(data);

              var status = Number(data.status);
              var doc_id = data.doc_id;

              if (status == 1){
                new Noty({ text: 'Заявка успешно отправлена. Ожидайте пожалуйста звонка.', type: 'success', timeout: 5000,   theme: 'nest' }).show();
                ga('send', 'event', 'callback', 'call_from_header');
                yaCounter6320767.reachGoal('video');
                new_lead('video', phone);
                
                  /* Заказ звонка */
                  //window.SalesNinja.reachGoal('69428ead-deee-44e1-a623-cd9c7e11d9a2');
              }
              else new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
              setTimeout(function(){   var e = document.querySelector("#popup-video .fancybox-close-small"); if (e) e.click();    },2000);
 
            }
          }
        });
      }
      else new Noty({ text: 'Введите пожалуйста номер телефона', type: 'error', timeout: 3000,   theme: 'nest' }).show();

      var el = document.querySelector("#popup-video .btn");
      if (el) el.disabled = false;
  }


  //В 1 КЛИК
  if(e.target && e.target.id== 'button-oneclick')
  {
      e.preventDefault();
      var el = document.querySelector(".s-lightbox-item-box #oneclick-form .button");
      if (el) el.disabled = true;

      var nid = document.querySelector('#oneclick-form .form-good_nid').value;
      var phone = document.querySelector('#oneclick-form .client_phone').value;
      var form_el = document.querySelector('#oneclick-form');
      if (form_el)
      {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
      }

      var yclid = '';
      ym(6320767, 'getClientID', function(clientID) {yclid = clientID; });

      const url = window.location.origin + window.location.pathname;
        form_data = form_data + "&url=" + url;
      form_data = form_data + "&yclid=" + yclid;


      if (phone && nid && form_data)
      {
        //form_data = form_data + '&nid=' + nid;
        ajax({
          type: "POST",
          url: "/sites/all/scripts/site_request_new.php",
          datajson: form_data,
          error: function(){
            var status = data.status;
            new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 5000,   theme: 'nest' }).show();
          },
          success: function(data){
            if (data) {
              var data = JSON.parse(data);
              var status = Number(data.status);
              var doc_id = data.doc_id;

              if (status == 1)
              {
                new Noty({ text: 'Заявка успешно отправлена', type: 'success', timeout: 5000,   theme: 'nest' }).show();

                ga('send', 'event', 'cart', 'buy_1_click');
                yaCounter6320767.reachGoal('but_1_click');
                new_lead('buy_1_click', phone);
                
                  /* Купить в 1 клик */
                  //window.SalesNinja.reachGoal('f6c87f13-6422-4e4a-8617-0c54e1bd5883');
              }
              else { new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show(); }
              setTimeout(function(){    var e = document.querySelector("#popup-oneclick .fancybox-close-small"); if (e) e.click();    },2000);
            }
          }
        });
      }
      else
      {
        new Noty({ text: 'Ошибка создания заявки', type: 'error', timeout: 3000,   theme: 'nest' }).show();
      }

      var el = document.querySelector(".s-lightbox-item-box #oneclick-form .button");
      if (el) el.disabled = false;
  }
}, false);


function active_favourite()
{

    // Ищем товары в избранном
    var els = document.querySelectorAll(".product");
    if (els) {
        var favouriteArray = favouriteGoods.listCartArray();
        for (const el of els) {
            var nid = el.getAttribute('data-nid');
            if (inArray(nid, favouriteArray))
            {
                var like = el.querySelector('.btn-liked');
                if (like) like.classList.add('active');
            }
        }
    }

    var els = document.querySelectorAll(".collect");
    if (els) {
        var favouriteArray = favouriteCollects.listCartArray();
        for (const el of els) {
            var nid = el.getAttribute('data-tid');
            if (inArray(nid, favouriteArray))
            {
                var like = el.querySelector('.btn-liked');
                if (like) like.classList.add('active');
            }
        }
    }
}



/*после полной прогрузки страницы*/
document.addEventListener("DOMContentLoaded", function(event)
{

    // Clear items
    var els = document.querySelectorAll(".clear-cart");
    if (els)
      for (const el of els)
      {
        el.addEventListener('click', event => {
          shoppingCart.clearCart();
          //displayCart();
        }, false);
      }

    var el = document.querySelector(".lightbox-oneclick-button");
    if (el) el.addEventListener('click', event => {
      var title = event.target.getAttribute('data-title');
      var button = event.target.getAttribute('data-button');
      var nid = event.target.getAttribute('data-nid');
      if (nid) document.querySelector('.form-good_nid').value = nid;
      if (title) document.querySelector('.cart-title-oneclick').innerHTML = title;
      if (button) document.querySelector('#call-form .button-form').innerHTML = button;
    }, false);


    var el = document.querySelector("#checkout .button, #checkout .button");
    if (el) el.disabled = true;
    //displayCart();



    var el = document.getElementById('cart-checkout');
    if (el) displayCart();

    var el = document.getElementById('cart-count');
    if (el) recalc_cart();

    var el = document.getElementById('block-favourites');
    if (el) displayFavourite();

    active_favourite();

});



