(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    game: Kotlin.definePackage(function () {
      this.backgroundColor = new _.game.Color(12299680);
      this.tileColors = Kotlin.modules['stdlib'].kotlin.collections.mapOf_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$(0, _.game.Color_qt1dr2$(205, 192, 180)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(2, new _.game.Color(15656154)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(4, new _.game.Color(15589576)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(8, new _.game.Color(15905145)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(16, new _.game.Color(16094563)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(32, new _.game.Color(16153695)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(64, new _.game.Color(16145979)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(128, new _.game.Color(15585138)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(256, new _.game.Color(15584353)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(512, new _.game.Color(15583312)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(1024, new _.game.Color(15582527)), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(2048, new _.game.Color(15581742))]);
      this.otherTileColor = new _.game.Color(3947058);
      this.lightTextColor = _.game.Color_qt1dr2$(119, 110, 101);
      this.darkTextColor = new _.game.Color(16381682);
      this.Canvas = Kotlin.createObject(null, function () {
        var tmp$0, tmp$1;
        this.canvas = (tmp$0 = document.getElementById('canvas')) != null ? tmp$0 : Kotlin.throwNPE();
        this.ctx = (tmp$1 = this.canvas.getContext('2d')) != null ? tmp$1 : Kotlin.throwNPE();
        this.b = new _.game.Board();
        this.b.insert();
        this.b.insert();
      }, {
        draw: function () {
          this.b.draw_mc5sii$(this.canvas, this.ctx);
        },
        keyDown_9ojx7i$: function (e) {
          var ek = e;
          var k = ek.key;
          if (k === undefined)
            k = Kotlin.toChar(ek.keyCode).toLowerCase().toString();
          if (Kotlin.modules['stdlib'].kotlin.text.contains_kzp0od$('udlr', k)) {
            this.b.push_s8itvh$(k.charAt(0));
            this.b.insert();
            this.b.draw_mc5sii$(this.canvas, this.ctx);
          }
        }
      });
    }, /** @lends _.game */ {
      Color: Kotlin.createClass(null, function (color) {
        this.color = color;
      }, /** @lends _.game.Color.prototype */ {
        toString: function () {
          return 'rgb(' + (this.color >> 16) + ',' + (this.color >> 8 & 255) + ',' + (this.color & 255) + ')';
        },
        component1: function () {
          return this.color;
        },
        copy_za3lpa$: function (color) {
          return new _.game.Color_qt1dr2$(color === void 0 ? this.color : color);
        },
        hashCode: function () {
          var result = 0;
          result = result * 31 + Kotlin.hashCode(this.color) | 0;
          return result;
        },
        equals_za3rmp$: function (other) {
          return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.color, other.color))));
        }
      }),
      Color_qt1dr2$: function (r, g, b, $this) {
        $this = $this || Object.create(_.game.Color.prototype);
        _.game.Color.call($this, (r << 16) + (g << 8) + b);
        return $this;
      },
      textColor_za3lpa$: function (tileValue) {
        return tileValue <= 4 ? _.game.lightTextColor : _.game.darkTextColor;
      },
      textSize_za3lpa$: function (tileValue) {
        return tileValue <= 64 ? 55 : tileValue <= 512 ? 45 : tileValue <= 2048 ? 35 : 30;
      },
      Board: Kotlin.createClass(null, function () {
        this.a_65j9rx$ = Kotlin.arrayFromFun(4, _.game.Board.a_65j9rx$f);
      }, /** @lends _.game.Board.prototype */ {
        insert: function () {
          var tmp$0, tmp$1;
          var free = Kotlin.modules['stdlib'].kotlin.collections.mutableListOf_9mqe4v$([]);
          tmp$0 = 3;
          for (var row = 0; row <= tmp$0; row++) {
            tmp$1 = 3;
            for (var col = 0; col <= tmp$1; col++)
              if (this.a_65j9rx$[row][col] === 0)
                free.add_za3rmp$(new Kotlin.modules['stdlib'].kotlin.Pair(row, col));
          }
          var idx = Math.floor(Math.random() * free.size);
          var tmp$2 = free.get_za3lpa$(idx)
          , row_0 = tmp$2.component1()
          , col_0 = tmp$2.component2();
          this.a_65j9rx$[row_0][col_0] = Math.random() < 0.1 ? 4 : 2;
        },
        pushLeft: function () {
          var tmp$0, tmp$1, tmp$2;
          var points = 0;
          tmp$0 = 3;
          for (var row = 0; row <= tmp$0; row++) {
            var $receiver = this.a_65j9rx$[row];
            var destination = new Kotlin.ArrayList();
            var tmp$5, tmp$3, tmp$4;
            tmp$5 = $receiver, tmp$3 = tmp$5.length;
            for (var tmp$4 = 0; tmp$4 !== tmp$3; ++tmp$4) {
              var element = tmp$5[tmp$4];
              if (element !== 0) {
                destination.add_za3rmp$(element);
              }
            }
            var r = destination;
            var canMelt = false;
            var s = Kotlin.modules['stdlib'].kotlin.collections.mutableListOf_9mqe4v$([]);
            tmp$1 = r.iterator();
            while (tmp$1.hasNext()) {
              var e = tmp$1.next();
              if (canMelt && e === Kotlin.modules['stdlib'].kotlin.collections.last_a7ptmv$(s)) {
                s.set_vux3hl$(Kotlin.modules['stdlib'].kotlin.collections.get_lastIndex_a7ptmv$(s), s.get_za3lpa$(Kotlin.modules['stdlib'].kotlin.collections.get_lastIndex_a7ptmv$(s)) + e);
                points += Kotlin.modules['stdlib'].kotlin.collections.last_a7ptmv$(s);
                canMelt = false;
              }
               else {
                s.add_za3rmp$(e);
                canMelt = true;
              }
            }
            while (s.size < 4)
              s.add_za3rmp$(0);
            tmp$2 = 3;
            for (var col = 0; col <= tmp$2; col++)
              this.a_65j9rx$[row][col] = s.get_za3lpa$(col);
          }
          return points;
        },
        flip: function () {
          var tmp$0;
          tmp$0 = 3;
          for (var row = 0; row <= tmp$0; row++)
            Kotlin.modules['stdlib'].kotlin.collections.reverse_eg9ybj$(this.a_65j9rx$[row]);
        },
        transpose: function () {
          var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4;
          tmp$0 = 3;
          for (var row = 1; row <= tmp$0; row++) {
            tmp$1 = Kotlin.modules['stdlib'].kotlin.ranges.until_rksjo2$(0, row), tmp$2 = tmp$1.first, tmp$3 = tmp$1.last, tmp$4 = tmp$1.step;
            for (var col = tmp$2; col <= tmp$3; col += tmp$4) {
              var t = this.a_65j9rx$[row][col];
              this.a_65j9rx$[row][col] = this.a_65j9rx$[col][row];
              this.a_65j9rx$[col][row] = t;
            }
          }
        },
        push_s8itvh$: function (ch) {
          if (ch === 'l')
            return this.pushLeft();
          else if (ch === 'r') {
            this.flip();
            var p = this.pushLeft();
            this.flip();
            return p;
          }
           else if (ch === 'u') {
            this.transpose();
            var p_0 = this.pushLeft();
            this.transpose();
            return p_0;
          }
           else if (ch === 'd') {
            this.transpose();
            this.flip();
            var p_1 = this.pushLeft();
            this.flip();
            this.transpose();
            return p_1;
          }
           else
            return 0;
        },
        draw_mc5sii$: function (canvas, g) {
          var tmp$0, tmp$1, tmp$2;
          g.fillStyle = (new _.game.Color(12299680)).toString();
          g.fillRect(0.0, 0.0, canvas.width, canvas.height);
          tmp$0 = 3;
          for (var row = 0; row <= tmp$0; row++) {
            tmp$1 = 3;
            for (var col = 0; col <= tmp$1; col++) {
              var tile = this.a_65j9rx$[row][col];
              g.fillStyle = ((tmp$2 = _.game.tileColors.get_za3rmp$(tile)) != null ? tmp$2 : _.game.otherTileColor).toString();
              g.fillRect(15.0 + 121 * col, 15.0 + 121 * row, 107.0, 107.0);
              if (tile > 0) {
                g.fillStyle = _.game.textColor_za3lpa$(tile).toString();
                g.font = _.game.textSize_za3lpa$(tile).toString() + 'px sans-serif';
                var s = tile.toString();
                var w = g.measureText(s).width;
                g.fillText(s, 15.0 + 121 * col + 53 - w / 2, 15.0 + 121 * row + 70);
              }
            }
          }
        }
      }, /** @lends _.game.Board */ {
        a_65j9rx$f: function (it) {
          return [0, 0, 0, 0];
        }
      }),
      start$f: function (it) {
        _.game.Canvas.keyDown_9ojx7i$(it);
      },
      start: function () {
        _.game.Canvas.draw();
        window.addEventListener('keydown', _.game.start$f, true);
      }
    })
  });
  Kotlin.defineModule('game', _);
}(Kotlin));
