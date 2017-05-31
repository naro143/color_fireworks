// This is a JavaScript file
// This is a JavaScript file
// Page init event
document.addEventListener('init', function(event) {
　
  var page = event.target;
  color_name = ["緑","赤","青","同","赤","青","同","同","同"];
　color_rgb = [[0,255,0],[255,0,0],[0,0,255],[255,255,255],[85,0,0],[0,0,170],[170,85,170],[85,85,0],[255,255,170]];
  if (page.matches('#first-page')) {
    page.querySelector('#push-button-easy').onclick = function() {
      max_num = 2;
      min_num = 0;
　    subscript = Math.floor( Math.random() * (max_num + 1 - min_num) + min_num );
　    color = new Object();
　      color.name = color_name[subscript];
　      color.rgb = color_rgb[subscript];
　
      document.querySelector('#navigator').pushPage('page2.html');
      
    };
    page.querySelector('#push-button-nomal').onclick = function() {
        max_num = 5;
        min_num = 3;
　      subscript = Math.floor( Math.random() * (max_num + 1 - min_num) + min_num );
　      color = new Object();
　        color.name = color_name[subscript];
　        color.rgb = color_rgb[subscript];
        document.querySelector('#navigator').pushPage('page2.html');
    };
    page.querySelector('#push-button-hard').onclick = function() {
        max_num = 8;
        min_num = 6;
　      subscript = Math.floor( Math.random() * (max_num + 1 - min_num) + min_num );
　      color = new Object();
　        color.name = color_name[subscript];
　        color.rgb = color_rgb[subscript];
        document.querySelector('#navigator').pushPage('page2.html');
    };

  } else if (page.matches('#second-page')) {
      user_rgb = [0,0,0];
      page.querySelector('#push-button-r').onclick = function() {
        if (user_rgb[0] < 255){
          user_rgb[0] += 85;
          opactiy = 1.0;
        } else {
           user_rgb[0] = 0;
           opactiy = 0.0;
        };
        r_bg = document.getElementById( "r_bg" );
        r_bg.style.backgroundColor = "rgba(" + user_rgb[0] + ",0,0," + opactiy +")";
      };
      page.querySelector('#push-button-g').onclick = function() {
        if (user_rgb[1] < 255){
          user_rgb[1] += 85;
          opactiy = 1.0;
        } else {
           user_rgb[1] = 0;
           opactiy = 0.0;
        };
        g_bg = document.getElementById( "g_bg" );
        g_bg.style.backgroundColor = "rgba(0," + user_rgb[1] + ",0,"+ opactiy +")";
      };
      page.querySelector('#push-button-b').onclick = function() {
        if (user_rgb[2] < 255){
          user_rgb[2] += 85;
          opactiy = 1.0;
        } else {
           user_rgb[2] = 0;
           opactiy = 0.0;
        };
        b_bg = document.getElementById( "b_bg" );
        b_bg.style.backgroundColor = "rgba(0,0," + user_rgb[2] +","+ opactiy +")";
      };
      page.querySelector('#push-button-firing').onclick = function() {
　　　　user_code = "#"+ String(two(user_rgb[0].toString(16))+ two(user_rgb[1].toString(16)) + two(user_rgb[2].toString(16)));
　　　　if(user_code == "#000000"){
　　　　    //alert("こんにちは"); 
　　　　}else {
　　　　//hanabi 
　　　　//
　　　　//
　　　　//
　　　　// =================================
        // Const
        // =================================
        var PI = Math.PI;
        var PI_2 = PI * 2;

        // =================================
        // Config
        // =================================
        var defaultConfig = {
          duration: 2000,         // ms
          delay: 0,               // ms
          radius: 5,              // px
          amount: 100,            // particle number
          speed: 12,
          gravity: 0.05,
          friction: 0.96,         
          reduction: 0.98,
          left: 0.5,
          top: 0.3,
          color: user_code
        };

        // =================================
        // Main
        // =================================
        setTimeout(function(){
          Canvas.canvas = document.querySelector("canvas");
          Canvas.canvas.width = document.documentElement.clientWidth;
          Canvas.canvas.height = document.documentElement.clientHeight - document.querySelector("ons-toolbar").offsetHeight - 1;
          Canvas.context = Canvas.canvas.getContext("2d");
          Canvas.context.fillStyle = "rgba(0, 0, 0, 0.15)";

          var firework = new Firework();
          Canvas.add(firework);
    
          Canvas.start();
        }, false);
        // =================================
        // Firework
        // =================================
        function Firework(config){
          this.setConfig(config || {});
          this.particleImage = createParticleImage(this.radius, this.color);
          this.diameter = this.radius * 2;
          this.isActive = true;
          this.fadeoutOpacity = 1;
        }

        Firework.prototype = {
          setConfig: function(config){
          for(var key in defaultConfig){
            if(config[key] === undefined){
              this[key] = defaultConfig[key];
            }else{
              this[key] = config[key];
            }
          }
        },
        
        initParticles: function(){
          this.particles = [];
          var x = this.canvas.width * this.left;
          var y = this.canvas.height * this.top;
          var maxSpeed = (this.speed / 2) * (this.speed / 2);
        
          while(this.particles.length < this.amount){
            var vx = (Math.random() - 0.5) * this.speed;
            var vy = (Math.random() - 0.5) * this.speed;         
            if(vx*vx + vy*vy <= maxSpeed){
                this.particles.push(new Particle(x, y, vx, vy));
            }
          }
        },
    
        update: function(passed){
          if(this.isActive === false ||
            this.started(passed) === false) return;
        
          if(this.ended(passed)){
            this.fadeout();
            return;
          }        
          this.move();
          this.render();
        },
    
        move: function(){
          var particles = this.particles;
          var particle;
          for(var i = 0, len = particles.length; i < len; i++){
            particle = particles[i];
            particle.vx *= this.friction;
            particle.vy = particle.vy * this.friction + this.gravity;
            particle.x += particle.vx;
            particle.y += particle.vy;
          }
        },
    
        render: function(){
          this.context.globalAlpha = 1;
          this.renderParticles();
        },
    
        renderParticles: function(){
          var diameter = this.diameter *= this.reduction;
          var context = this.context;
          var particles = this.particles;
          var particleImage = this.particleImage;
          var p;
          for(var i = 0, len = particles.length; i < len; i++){
            p = particles[i];
            context.drawImage(particleImage, p.x, p.y, diameter, diameter);
          }
        },
    
        started: function(passed){
          return this.delay < passed;
        },
    
        ended: function(passed){
          return this.duration + this.delay < passed;
        },
    
        fadeout: function(){
          this.fadeoutOpacity -= 0.1;
          if(this.fadeoutOpacity <= 0) {
            this.isActive = false;
            return;
          }
          this.move();
          this.context.globalAlpha = this.fadeoutOpacity;
          this.renderParticles();
        }
    };



    // =================================
    // Particle
    // =================================
    function Particle(x, y, vx, vy){
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
    }


    // =================================
    // Canvas
    // =================================
    var Canvas = {
      fireworks: [],
    
      add: function(firework){
        firework.canvas = this.canvas;
        firework.context = this.context;
        firework.initParticles();
        this.fireworks.push(firework);
      },
    
    start: function(){
        this.startTime = Number(new Date());
        this.update();
    },
    
    fill: function(){
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    // main loop
    update: function(){
        this.fill();
        var passed = new Date() - this.startTime;
        var activeFireworkCount = 0;
        this.fireworks.forEach(function(firework){
            if(firework.isActive){
                firework.update(passed);
                activeFireworkCount++;
            }
        }.bind(this));
        
        if(0 < activeFireworkCount){
            requestAnimationFrame(this.update.bind(this));
        }else{
            requestAnimationFrame(this.fadeout.bind(this, 10));
        }
    },
    
    fadeout: function(count){
        if(count < 0){
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            return;    // animation end
        }
        this.context.globalAlpha = 1;
        this.context.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.fill();
        requestAnimationFrame(this.fadeout.bind(this, count - 1));
    }
};


// =================================
// Utils
// =================================
if (Function.prototype.bind === undefined){
  Function.prototype.bind = function( obj ) {
    var slice = [].slice,
        args = slice.call(arguments, 1), 
        self = this, 
        bound = function () {
          return self.apply( obj || window ,  args.concat( slice.call(arguments) ) );    
        };
    bound.prototype = this.prototype;
    return bound;
  };
};

function createParticleImage(radius, color){
    var size = radius * 2;
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    var context = canvas.getContext("2d");
    
    var gradient = context.createRadialGradient(radius, radius, 0, radius, radius, size);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.1, "white");
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(radius, radius, radius, 0, PI_2, true);
    context.fill();
    //return canvas

    var particle = new Image();
    particle.src = canvas.toDataURL();
    return particle;
};

//set window.requestAnimationFrame
(function (w, r) {
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(window, 'equestAnimationFrame');
        //
        
        document.querySelector('#navigator').pushPage('page3.html');
　　　  };
      };
    }else if (page.matches('#third-page')){
        function toPage4(){
            document.querySelector('#navigator').pushPage("page4.html", {animation:"fade"});
        }
        setTimeout(toPage4, 4000);
    }else if (page.matches('#fourth-page')){
    　if (JSON.stringify(user_rgb) === JSON.stringify(color.rgb)){
         document.getElementById("result").innerHTML = '<img src="images/sacces.png">';
         document.getElementById("result_page").classList.add('succes');
    　}else {
    　    document.getElementById("result").innerHTML = '<img src="images/falut.png">';
    　    document.getElementById("result_page").classList.add('falut');
    　};
      page.querySelector('#push-button-toTitle').onclick = function() {
        document.querySelector('#navigator').resetToPage("page1.html", {animation:"default"});
      };
    };
　
  //target css
  radius =  document.getElementById("push-button-firing");
  r_width = parseInt(document.documentElement.clientHeight - document.querySelector("ons-toolbar").offsetHeight - 1) * 0.4;
  radius.style.width = r_width + "px";
  
  target = document.getElementById("target");
　target.innerHTML = color.name;
　
　target.style.fontSize = r_width / 2 + "px";
　target.style.lineHeight = r_width + "px";
  
  color_code =  document.getElementById("push-button-r");
  color_code_width = parseInt(document.documentElement.clientHeight - document.querySelector("ons-toolbar").clientHeight - 1) * 0.4 * 0.5;
  color_code.style.width = color_code_width + "px";
  color_code =  document.getElementById("push-button-g");
  color_code.style.width = color_code_width + "px";
  color_code =  document.getElementById("push-button-b");
  color_code.style.width = color_code_width + "px";
  
  rule_button =  document.getElementById("push-button-rule");
  rule_button_width = parseInt(rule_button.clientHeight);
  rule_button.style.width = rule_button_width + "px";
  
  
　var two = function(v) {
              return ('0' + v).slice(-2);
            };
  color_code = "#"+ String(two(color.rgb[0].toString(16))+ two(color.rgb[1].toString(16)) + two(color.rgb[2].toString(16)));
　target.style.color = color_code;
　
　document.getElementById("target-color-code").innerHTML = color_code;
　document.getElementById("user-color-code").innerHTML = user_code;
　
　target_color = document.getElementById("target-color-code");
　target_color.style.color = color_code;
　user_color = document.getElementById("user-color-code");
　user_color.style.color = user_code;
});


