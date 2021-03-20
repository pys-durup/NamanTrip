 var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center : new kakao.maps.LatLng(36.658481, 127.997876), // 지도의 중심좌표
            level : 12 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


        //follow quick menu
        $(window).scroll(function(){
            var scrollTop = $(document).scrollTop();
            if (scrollTop < 180) {
                scrollTop = 180;
                }
            $("#sideNav").stop();
            $("#sideNav").animate( { "top" : scrollTop });
        });
        // mapSection
        // sideNav

        $(window).scroll(  
            function(){  
                //스크롤의 위치가 상단에서 450보다 크면  
                if($(window).scrollTop() > 450){  
                /* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */  
                    $('#mapSection').addClass("fix");  
                    //위의 if문에 대한 조건 만족시 fix라는 class를 부여함  
                }else{  
                    $('#mapSection').removeClass("fix");  
                    //위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함  
                }  
            }  
        );  