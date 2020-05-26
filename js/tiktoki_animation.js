(function($){
  "use strict";

$(document).ready(function() {
		   	var stickyNavTop = $('.navbar').offset().top;
		   	var stickyNav = function(){
			    var scrollTop = $(window).scrollTop();
			    if (scrollTop > stickyNavTop) { 
			        $('.navbar').addClass('navscroll').find('span').addClass('shrink')
                      $('.tik-tokicon').addClass('instaanim');
			    } else {
			        $('.navbar').removeClass('navscroll');
					$('.navbar span').removeClass('shrink');
					$('.tik-tokicon').removeClass('instaanim');
			    }
			};
			stickyNav();
			$(window).on("scroll",function() {
				
				stickyNav();
			});
		
	$("#download").on("click",function() {
      var vid_url = $("#url").val();
      if(isUrlValid(vid_url)){    

        $('#download').button('loading');
		 $('.resultdiv').hide();
		 $('#data').html(' ');
        $.ajax({
          type:"POST",      
          dataType:'json',
          url:'tiktoki-scraper.php',
          data:{url:vid_url},
          success:function(data){
            console.log(data);
			if(data.status=="success"){
				$('.profilepic').attr('src', data.profile_pic_url);
				
				$('#username').html(data.username);
				$('.username').attr('href', data.profileurl);
				
				$('.profilename').html(data.name);
				$('.profilename').attr('href', data.profileurl);
				
				
	
				if(data.watermark_removed=="yes"){
					$('#data').html('<video id="video" width="100%" autoplay="autoplay" loop="loop" muted="muted" controls><source src="'+data.videourl+'" type="video/mp4" >Your browser does not support the video tag. </video><div class="download-info"><a href="downloadvideo.php?url='+data.videourl+'" class="downloadbutton " >Download Without Watermark</a><a href="downloadvideo.php?url='+data.ogvideourl+'" class="downloadbutton" >Download Original</a><p style="margin-top:10px;" >Right-Click on video and click "save video as.."</p></div>');
					$("#video")[0].load();
				}else{
					
					$('#data').html('<video id="video" width="100%" autoplay="autoplay" loop="loop" muted="muted" controls><source src="'+data.videourl+'" type="video/mp4" >Your browser does not support the video tag. </video><div class="download-info"><a href="downloadvideo.php?url='+data.ogvideourl+'" class="downloadbutton" >Download Original</a><p style="margin-top:10px; color:blue;" >Error fetching download link without watermark</p><p style="margin-top:10px;" >Right-Click on video and click "save video as.."</p></div>');
					$("#video")[0].load();
				}
				if(data.musicflag=="yes"){
					
		$('#data').append('<hr><div class="profileheader" style="display:inline-block;"><a href="#"><img class="profilepic " src="'+data.musiccover+'" ></a><a href="'+data.musicurl+'" class="profilename">'+data.musictitle+'</a><br><a href="'+data.musicurl+'" class="username"><span id="username" class="text-muted">'+data.musicauthor+'</span></a></div><a href="downloadmusic.php?url='+data.musicplayurl+'" class="downloadmusicbutton pull-right" _target="blank">Download Music</a>');
				}

				 $('.resultdiv').show();
				 
				   $('html, body').animate({
					scrollTop: $('.resultdiv').offset().top
				  }, 800);
				 
				 $('#download').button('reset');
				 
			}else{
				
				alert('Something went wrong. Please check your Video URL');
				 $('#download').button('reset');
			}
         
          }
        })
      }else{ 
		  alert('URL seems invalid.');
		  $('#download').button('reset');
	  }
	});
	function isUrlValid(url) {
				return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
			}	
		});
  
})(jQuery);

