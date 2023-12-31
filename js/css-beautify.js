!(function () {
    var e;
    !(function () {
        "use strict";
        var n = [
            ,
            ,
            function (t) {
                function _(t) {
                    (this.__parent = t),
                        (this.__character_count = 0),
                        (this.__indent_count = -1),
                        (this.__alignment_count = 0),
                        (this.__wrap_point_index = 0),
                        (this.__wrap_point_character_count = 0),
                        (this.__wrap_point_indent_count = -1),
                        (this.__wrap_point_alignment_count = 0),
                        (this.__items = []);
                }
                function i(t, e) {
                    (this.__cache = [""]),
                        (this.__indent_size = t.indent_size),
                        (this.__indent_string = t.indent_char),
                        t.indent_with_tabs ||
                        (this.__indent_string = new Array(t.indent_size + 1).join(
                            t.indent_char
                        )),
                        (e = e || ""),
                        0 < t.indent_level &&
                        (e = new Array(t.indent_level + 1).join(this.__indent_string)),
                        (this.__base_string = e),
                        (this.__base_string_length = e.length);
                }
                function e(t, e) {
                    (this.__indent_cache = new i(t, e)),
                        (this.raw = !1),
                        (this._end_with_newline = t.end_with_newline),
                        (this.indent_size = t.indent_size),
                        (this.wrap_line_length = t.wrap_line_length),
                        (this.indent_empty_lines = t.indent_empty_lines),
                        (this.__lines = []),
                        (this.previous_line = null),
                        (this.current_line = null),
                        (this.next_line = new _(this)),
                        (this.space_before_token = !1),
                        (this.non_breaking_space = !1),
                        (this.previous_token_wrapped = !1),
                        this.__add_outputline();
                }
                (_.prototype.clone_empty = function () {
                    var t = new _(this.__parent);
                    return t.set_indent(this.__indent_count, this.__alignment_count), t;
                }),
                    (_.prototype.item = function (t) {
                        return t < 0
                            ? this.__items[this.__items.length + t]
                            : this.__items[t];
                    }),
                    (_.prototype.has_match = function (t) {
                        for (var e = this.__items.length - 1; 0 <= e; e--)
                            if (this.__items[e].match(t)) return !0;
                        return !1;
                    }),
                    (_.prototype.set_indent = function (t, e) {
                        this.is_empty() &&
                            ((this.__indent_count = t || 0),
                                (this.__alignment_count = e || 0),
                                (this.__character_count = this.__parent.get_indent_size(
                                    this.__indent_count,
                                    this.__alignment_count
                                )));
                    }),
                    (_.prototype._set_wrap_point = function () {
                        this.__parent.wrap_line_length &&
                            ((this.__wrap_point_index = this.__items.length),
                                (this.__wrap_point_character_count = this.__character_count),
                                (this.__wrap_point_indent_count =
                                    this.__parent.next_line.__indent_count),
                                (this.__wrap_point_alignment_count =
                                    this.__parent.next_line.__alignment_count));
                    }),
                    (_.prototype._should_wrap = function () {
                        return (
                            this.__wrap_point_index &&
                            this.__character_count > this.__parent.wrap_line_length &&
                            this.__wrap_point_character_count >
                            this.__parent.next_line.__character_count
                        );
                    }),
                    (_.prototype._allow_wrap = function () {
                        if (this._should_wrap()) {
                            this.__parent.add_new_line();
                            var t = this.__parent.current_line;
                            return (
                                t.set_indent(
                                    this.__wrap_point_indent_count,
                                    this.__wrap_point_alignment_count
                                ),
                                (t.__items = this.__items.slice(this.__wrap_point_index)),
                                (this.__items = this.__items.slice(
                                    0,
                                    this.__wrap_point_index
                                )),
                                (t.__character_count +=
                                    this.__character_count - this.__wrap_point_character_count),
                                (this.__character_count = this.__wrap_point_character_count),
                                " " === t.__items[0] &&
                                (t.__items.splice(0, 1), --t.__character_count),
                                !0
                            );
                        }
                        return !1;
                    }),
                    (_.prototype.is_empty = function () {
                        return 0 === this.__items.length;
                    }),
                    (_.prototype.last = function () {
                        return this.is_empty()
                            ? null
                            : this.__items[this.__items.length - 1];
                    }),
                    (_.prototype.push = function (t) {
                        this.__items.push(t);
                        var e = t.lastIndexOf("\n");
                        -1 !== e
                            ? (this.__character_count = t.length - e)
                            : (this.__character_count += t.length);
                    }),
                    (_.prototype.pop = function () {
                        var t = null;
                        return (
                            this.is_empty() ||
                            ((t = this.__items.pop()),
                                (this.__character_count -= t.length)),
                            t
                        );
                    }),
                    (_.prototype._remove_indent = function () {
                        0 < this.__indent_count &&
                            (--this.__indent_count,
                                (this.__character_count -= this.__parent.indent_size));
                    }),
                    (_.prototype._remove_wrap_indent = function () {
                        0 < this.__wrap_point_indent_count &&
                            --this.__wrap_point_indent_count;
                    }),
                    (_.prototype.trim = function () {
                        for (; " " === this.last();)
                            this.__items.pop(), --this.__character_count;
                    }),
                    (_.prototype.toString = function () {
                        var t = "";
                        return (
                            this.is_empty()
                                ? this.__parent.indent_empty_lines &&
                                (t = this.__parent.get_indent_string(this.__indent_count))
                                : ((t = this.__parent.get_indent_string(
                                    this.__indent_count,
                                    this.__alignment_count
                                )),
                                    (t += this.__items.join(""))),
                            t
                        );
                    }),
                    (i.prototype.get_indent_size = function (t, e) {
                        var i = this.__base_string_length;
                        return (
                            t < 0 && (i = 0),
                            (i += t * this.__indent_size),
                            (i += e = e || 0)
                        );
                    }),
                    (i.prototype.get_indent_string = function (t, e) {
                        var i = this.__base_string;
                        return (
                            (e = e || 0),
                            t < 0 && ((t = 0), (i = "")),
                            (e += t * this.__indent_size),
                            this.__ensure_cache(e),
                            (i += this.__cache[e])
                        );
                    }),
                    (i.prototype.__ensure_cache = function (t) {
                        for (; t >= this.__cache.length;) this.__add_column();
                    }),
                    (i.prototype.__add_column = function () {
                        var t,
                            e = this.__cache.length,
                            i = "";
                        this.__indent_size &&
                            e >= this.__indent_size &&
                            ((e -=
                                (t = Math.floor(e / this.__indent_size)) *
                                this.__indent_size),
                                (i = new Array(t + 1).join(this.__indent_string))),
                            e && (i += new Array(e + 1).join(" ")),
                            this.__cache.push(i);
                    }),
                    (e.prototype.__add_outputline = function () {
                        (this.previous_line = this.current_line),
                            (this.current_line = this.next_line.clone_empty()),
                            this.__lines.push(this.current_line);
                    }),
                    (e.prototype.get_line_number = function () {
                        return this.__lines.length;
                    }),
                    (e.prototype.get_indent_string = function (t, e) {
                        return this.__indent_cache.get_indent_string(t, e);
                    }),
                    (e.prototype.get_indent_size = function (t, e) {
                        return this.__indent_cache.get_indent_size(t, e);
                    }),
                    (e.prototype.is_empty = function () {
                        return !this.previous_line && this.current_line.is_empty();
                    }),
                    (e.prototype.add_new_line = function (t) {
                        return (
                            !(this.is_empty() || (!t && this.just_added_newline())) &&
                            (this.raw || this.__add_outputline(), !0)
                        );
                    }),
                    (e.prototype.get_code = function (t) {
                        this.trim(!0);
                        var e = this.current_line.pop();
                        e &&
                            ("\n" === e[e.length - 1] && (e = e.replace(/\n+$/g, "")),
                                this.current_line.push(e)),
                            this._end_with_newline && this.__add_outputline();
                        e = this.__lines.join("\n");
                        return (e = "\n" !== t ? e.replace(/[\n]/g, t) : e);
                    }),
                    (e.prototype.set_wrap_point = function () {
                        this.current_line._set_wrap_point();
                    }),
                    (e.prototype.set_indent = function (t, e) {
                        return (
                            this.next_line.set_indent((t = t || 0), (e = e || 0)),
                            1 < this.__lines.length
                                ? (this.current_line.set_indent(t, e), !0)
                                : (this.current_line.set_indent(), !1)
                        );
                    }),
                    (e.prototype.add_raw_token = function (t) {
                        for (var e = 0; e < t.newlines; e++) this.__add_outputline();
                        this.current_line.set_indent(-1),
                            this.current_line.push(t.whitespace_before),
                            this.current_line.push(t.text),
                            (this.space_before_token = !1),
                            (this.non_breaking_space = !1),
                            (this.previous_token_wrapped = !1);
                    }),
                    (e.prototype.add_token = function (t) {
                        this.__add_space_before_token(),
                            this.current_line.push(t),
                            (this.space_before_token = !1),
                            (this.non_breaking_space = !1),
                            (this.previous_token_wrapped = this.current_line._allow_wrap());
                    }),
                    (e.prototype.__add_space_before_token = function () {
                        this.space_before_token &&
                            !this.just_added_newline() &&
                            (this.non_breaking_space || this.set_wrap_point(),
                                this.current_line.push(" "));
                    }),
                    (e.prototype.remove_indent = function (t) {
                        for (var e = this.__lines.length; t < e;)
                            this.__lines[t]._remove_indent(), t++;
                        this.current_line._remove_wrap_indent();
                    }),
                    (e.prototype.trim = function (t) {
                        for (
                            t = void 0 !== t && t, this.current_line.trim();
                            t && 1 < this.__lines.length && this.current_line.is_empty();

                        )
                            this.__lines.pop(),
                                (this.current_line = this.__lines[this.__lines.length - 1]),
                                this.current_line.trim();
                        this.previous_line =
                            1 < this.__lines.length
                                ? this.__lines[this.__lines.length - 2]
                                : null;
                    }),
                    (e.prototype.just_added_newline = function () {
                        return this.current_line.is_empty();
                    }),
                    (e.prototype.just_added_blankline = function () {
                        return (
                            this.is_empty() ||
                            (this.current_line.is_empty() && this.previous_line.is_empty())
                        );
                    }),
                    (e.prototype.ensure_empty_line_above = function (t, e) {
                        for (var i = this.__lines.length - 2; 0 <= i;) {
                            var n = this.__lines[i];
                            if (n.is_empty()) break;
                            if (0 !== n.item(0).indexOf(t) && n.item(-1) !== e) {
                                this.__lines.splice(i + 1, 0, new _(this)),
                                    (this.previous_line =
                                        this.__lines[this.__lines.length - 2]);
                                break;
                            }
                            i--;
                        }
                    }),
                    (t.exports.Output = e);
            },
            ,
            ,
            ,
            function (t) {
                function e(t, e) {
                    (this.raw_options = i(t, e)),
                        (this.disabled = this._get_boolean("disabled")),
                        (this.eol = this._get_characters("eol", "auto")),
                        (this.end_with_newline = this._get_boolean("end_with_newline")),
                        (this.indent_size = this._get_number("indent_size", 4)),
                        (this.indent_char = this._get_characters("indent_char", " ")),
                        (this.indent_level = this._get_number("indent_level")),
                        (this.preserve_newlines = this._get_boolean(
                            "preserve_newlines",
                            !0
                        )),
                        (this.max_preserve_newlines = this._get_number(
                            "max_preserve_newlines",
                            32786
                        )),
                        this.preserve_newlines || (this.max_preserve_newlines = 0),
                        (this.indent_with_tabs = this._get_boolean(
                            "indent_with_tabs",
                            "\t" === this.indent_char
                        )),
                        this.indent_with_tabs &&
                        ((this.indent_char = "\t"),
                            1 === this.indent_size && (this.indent_size = 4)),
                        (this.wrap_line_length = this._get_number(
                            "wrap_line_length",
                            this._get_number("max_char")
                        )),
                        (this.indent_empty_lines =
                            this._get_boolean("indent_empty_lines")),
                        (this.templating = this._get_selection_list(
                            "templating",
                            [
                                "auto",
                                "none",
                                "django",
                                "erb",
                                "handlebars",
                                "php",
                                "smarty",
                            ],
                            ["auto"]
                        ));
                }
                function i(t, e) {
                    var i,
                        n = {};
                    for (i in (t = _(t))) i !== e && (n[i] = t[i]);
                    if (e && t[e]) for (i in t[e]) n[i] = t[e][i];
                    return n;
                }
                function _(t) {
                    var e,
                        i = {};
                    for (e in t) i[e.replace(/-/g, "_")] = t[e];
                    return i;
                }
                (e.prototype._get_array = function (t, e) {
                    (t = this.raw_options[t]), (e = e || []);
                    return (
                        "object" == typeof t
                            ? null !== t &&
                            "function" == typeof t.concat &&
                            (e = t.concat())
                            : "string" == typeof t && (e = t.split(/[^a-zA-Z0-9_\/\-]+/)),
                        e
                    );
                }),
                    (e.prototype._get_boolean = function (t, e) {
                        t = this.raw_options[t];
                        return void 0 === t ? !!e : !!t;
                    }),
                    (e.prototype._get_characters = function (t, e) {
                        (t = this.raw_options[t]), (e = e || "");
                        return (e =
                            "string" == typeof t
                                ? t
                                    .replace(/\\r/, "\r")
                                    .replace(/\\n/, "\n")
                                    .replace(/\\t/, "\t")
                                : e);
                    }),
                    (e.prototype._get_number = function (t, e) {
                        t = this.raw_options[t];
                        (e = parseInt(e, 10)), isNaN(e) && (e = 0);
                        t = parseInt(t, 10);
                        return (t = isNaN(t) ? e : t);
                    }),
                    (e.prototype._get_selection = function (t, e, i) {
                        i = this._get_selection_list(t, e, i);
                        if (1 !== i.length)
                            throw new Error(
                                "Invalid Option Value: The option '" +
                                t +
                                "' can only be one of the following values:\n" +
                                e +
                                "\nYou passed in: '" +
                                this.raw_options[t] +
                                "'"
                            );
                        return i[0];
                    }),
                    (e.prototype._get_selection_list = function (t, e, i) {
                        if (!e || 0 === e.length)
                            throw new Error("Selection list cannot be empty.");
                        if (((i = i || [e[0]]), !this._is_valid_selection(i, e)))
                            throw new Error("Invalid Default Value!");
                        i = this._get_array(t, i);
                        if (!this._is_valid_selection(i, e))
                            throw new Error(
                                "Invalid Option Value: The option '" +
                                t +
                                "' can contain only the following values:\n" +
                                e +
                                "\nYou passed in: '" +
                                this.raw_options[t] +
                                "'"
                            );
                        return i;
                    }),
                    (e.prototype._is_valid_selection = function (t, e) {
                        return (
                            t.length &&
                            e.length &&
                            !t.some(function (t) {
                                return -1 === e.indexOf(t);
                            })
                        );
                    }),
                    (t.exports.Options = e),
                    (t.exports.normalizeOpts = _),
                    (t.exports.mergeOpts = i);
            },
            ,
            function (t) {
                var n = RegExp.prototype.hasOwnProperty("sticky");
                function e(t) {
                    (this.__input = t || ""),
                        (this.__input_length = this.__input.length),
                        (this.__position = 0);
                }
                (e.prototype.restart = function () {
                    this.__position = 0;
                }),
                    (e.prototype.back = function () {
                        0 < this.__position && --this.__position;
                    }),
                    (e.prototype.hasNext = function () {
                        return this.__position < this.__input_length;
                    }),
                    (e.prototype.next = function () {
                        var t = null;
                        return (
                            this.hasNext() &&
                            ((t = this.__input.charAt(this.__position)),
                                (this.__position += 1)),
                            t
                        );
                    }),
                    (e.prototype.peek = function (t) {
                        var e = null;
                        return (
                            (t = t || 0),
                            (e =
                                0 <= (t += this.__position) && t < this.__input_length
                                    ? this.__input.charAt(t)
                                    : e)
                        );
                    }),
                    (e.prototype.__match = function (t, e) {
                        t.lastIndex = e;
                        var i = t.exec(this.__input);
                        return !i || (n && t.sticky) || (i.index !== e && (i = null)), i;
                    }),
                    (e.prototype.test = function (t, e) {
                        return (
                            (e = e || 0),
                            0 <= (e += this.__position) &&
                            e < this.__input_length &&
                            !!this.__match(t, e)
                        );
                    }),
                    (e.prototype.testChar = function (t, e) {
                        e = this.peek(e);
                        return (t.lastIndex = 0), null !== e && t.test(e);
                    }),
                    (e.prototype.match = function (t) {
                        t = this.__match(t, this.__position);
                        return t ? (this.__position += t[0].length) : (t = null), t;
                    }),
                    (e.prototype.read = function (t, e, i) {
                        var n,
                            _ = "";
                        return (
                            t && (n = this.match(t)) && (_ += n[0]),
                            !e || (!n && t) || (_ += this.readUntil(e, i)),
                            _
                        );
                    }),
                    (e.prototype.readUntil = function (t, e) {
                        var i,
                            n = this.__position;
                        t.lastIndex = this.__position;
                        t = t.exec(this.__input);
                        return (
                            t
                                ? ((n = t.index), e && (n += t[0].length))
                                : (n = this.__input_length),
                            (i = this.__input.substring(this.__position, n)),
                            (this.__position = n),
                            i
                        );
                    }),
                    (e.prototype.readUntilAfter = function (t) {
                        return this.readUntil(t, !0);
                    }),
                    (e.prototype.get_regexp = function (t, e) {
                        var i = null,
                            e = e && n ? "y" : "g";
                        return (
                            "string" == typeof t && "" !== t
                                ? (i = new RegExp(t, e))
                                : t && (i = new RegExp(t.source, e)),
                            i
                        );
                    }),
                    (e.prototype.get_literal_regexp = function (t) {
                        return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    }),
                    (e.prototype.peekUntilAfter = function (t) {
                        var e = this.__position,
                            t = this.readUntilAfter(t);
                        return (this.__position = e), t;
                    }),
                    (e.prototype.lookBack = function (t) {
                        var e = this.__position - 1;
                        return (
                            e >= t.length &&
                            this.__input.substring(e - t.length, e).toLowerCase() === t
                        );
                    }),
                    (t.exports.InputScanner = e);
            },
            ,
            ,
            ,
            ,
            function (t) {
                function e(t, e) {
                    (t = "string" == typeof t ? t : t.source),
                        (e = "string" == typeof e ? e : e.source),
                        (this.__directives_block_pattern = new RegExp(
                            t + / beautify( \w+[:]\w+)+ /.source + e,
                            "g"
                        )),
                        (this.__directive_pattern = / (\w+)[:](\w+)/g),
                        (this.__directives_end_ignore_pattern = new RegExp(
                            t + /\sbeautify\signore:end\s/.source + e,
                            "g"
                        ));
                }
                (e.prototype.get_directives = function (t) {
                    if (!t.match(this.__directives_block_pattern)) return null;
                    var e = {};
                    this.__directive_pattern.lastIndex = 0;
                    for (var i = this.__directive_pattern.exec(t); i;)
                        (e[i[1]] = i[2]), (i = this.__directive_pattern.exec(t));
                    return e;
                }),
                    (e.prototype.readIgnored = function (t) {
                        return t.readUntilAfter(this.__directives_end_ignore_pattern);
                    }),
                    (t.exports.Directives = e);
            },
            ,
            function (t, e, i) {
                var n = i(16).Beautifier,
                    _ = i(17).Options;
                (t.exports = function (t, e) {
                    return new n(t, e).beautify();
                }),
                    (t.exports.defaultOptions = function () {
                        return new _();
                    });
            },
            function (t, e, i) {
                var n = i(17).Options,
                    d = i(2).Output,
                    g = i(8).InputScanner,
                    f = new (i(13).Directives)(/\/\*/, /\*\//),
                    w = /\r\n|[\r\n]/,
                    y = /\r\n|[\r\n]/g,
                    v = /\s/,
                    m = /(?:\s|\n)+/g,
                    b = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
                    x = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
                function _(t, e) {
                    (this._source_text = t || ""),
                        (this._options = new n(e)),
                        (this._ch = null),
                        (this._input = null),
                        (this.NESTED_AT_RULE = {
                            "@page": !0,
                            "@font-face": !0,
                            "@keyframes": !0,
                            "@media": !0,
                            "@supports": !0,
                            "@document": !0,
                        }),
                        (this.CONDITIONAL_GROUP_RULE = {
                            "@media": !0,
                            "@supports": !0,
                            "@document": !0,
                        });
                }
                (_.prototype.eatString = function (t) {
                    var e = "";
                    for (this._ch = this._input.next(); this._ch;) {
                        if (((e += this._ch), "\\" === this._ch)) e += this._input.next();
                        else if (-1 !== t.indexOf(this._ch) || "\n" === this._ch) break;
                        this._ch = this._input.next();
                    }
                    return e;
                }),
                    (_.prototype.eatWhitespace = function (t) {
                        for (
                            var e = v.test(this._input.peek()), i = 0;
                            v.test(this._input.peek());

                        )
                            (this._ch = this._input.next()),
                                t &&
                                "\n" === this._ch &&
                                (0 === i || i < this._options.max_preserve_newlines) &&
                                (i++, this._output.add_new_line(!0));
                        return e;
                    }),
                    (_.prototype.foundNestedPseudoClass = function () {
                        for (var t = 0, e = 1, i = this._input.peek(e); i;) {
                            if ("{" === i) return !0;
                            if ("(" === i) t += 1;
                            else if (")" === i) {
                                if (0 === t) return !1;
                                --t;
                            } else if (";" === i || "}" === i) return !1;
                            e++, (i = this._input.peek(e));
                        }
                        return !1;
                    }),
                    (_.prototype.print_string = function (t) {
                        this._output.set_indent(this._indentLevel),
                            (this._output.non_breaking_space = !0),
                            this._output.add_token(t);
                    }),
                    (_.prototype.preserveSingleSpace = function (t) {
                        t && (this._output.space_before_token = !0);
                    }),
                    (_.prototype.indent = function () {
                        this._indentLevel++;
                    }),
                    (_.prototype.outdent = function () {
                        0 < this._indentLevel && this._indentLevel--;
                    }),
                    (_.prototype.beautify = function () {
                        if (this._options.disabled) return this._source_text;
                        var t = this._source_text,
                            e = this._options.eol;
                        "auto" === e &&
                            ((e = "\n"), t && w.test(t || "") && (e = t.match(w)[0]));
                        var i = (t = t.replace(y, "\n")).match(/^[\t ]*/)[0];
                        (this._output = new d(this._options, i)),
                            (this._input = new g(t)),
                            (this._indentLevel = 0),
                            (this._nestedLevel = 0),
                            (this._ch = null);
                        for (
                            var n,
                            _,
                            s,
                            r,
                            h = 0,
                            o = !1,
                            p = !1,
                            a = !1,
                            u = !1,
                            c = !1,
                            l = this._ch;
                            (n = "" !== this._input.read(m)),
                            (_ = l),
                            (this._ch = this._input.next()),
                            "\\" === this._ch &&
                            this._input.hasNext() &&
                            (this._ch += this._input.next()),
                            (l = this._ch),
                            this._ch;

                        )
                            "/" === this._ch && "*" === this._input.peek()
                                ? (this._output.add_new_line(),
                                    this._input.back(),
                                    (r = this._input.read(b)),
                                    (s = f.get_directives(r)) &&
                                    "start" === s.ignore &&
                                    (r += f.readIgnored(this._input)),
                                    this.print_string(r),
                                    this.eatWhitespace(!0),
                                    this._output.add_new_line())
                                : "/" === this._ch && "/" === this._input.peek()
                                    ? ((this._output.space_before_token = !0),
                                        this._input.back(),
                                        this.print_string(this._input.read(x)),
                                        this.eatWhitespace(!0))
                                    : "@" === this._ch
                                        ? (this.preserveSingleSpace(n),
                                            "{" === this._input.peek()
                                                ? this.print_string(this._ch + this.eatString("}"))
                                                : (this.print_string(this._ch),
                                                    (r =
                                                        this._input.peekUntilAfter(
                                                            /[: ,;{}()[\]\/='"]/g
                                                        )).match(/[ :]$/) &&
                                                    ((r = this.eatString(": ").replace(/\s$/, "")),
                                                        this.print_string(r),
                                                        (this._output.space_before_token = !0)),
                                                    "extend" === (r = r.replace(/\s$/, ""))
                                                        ? (u = !0)
                                                        : "import" === r && (c = !0),
                                                    r in this.NESTED_AT_RULE
                                                        ? ((this._nestedLevel += 1),
                                                            r in this.CONDITIONAL_GROUP_RULE && (a = !0))
                                                        : o ||
                                                        0 !== h ||
                                                        -1 === r.indexOf(":") ||
                                                        ((p = !0), this.indent())))
                                        : "#" === this._ch && "{" === this._input.peek()
                                            ? (this.preserveSingleSpace(n),
                                                this.print_string(this._ch + this.eatString("}")))
                                            : "{" === this._ch
                                                ? (p && ((p = !1), this.outdent()),
                                                    (o = a
                                                        ? ((a = !1), this._indentLevel >= this._nestedLevel)
                                                        : this._indentLevel >= this._nestedLevel - 1),
                                                    this._options.newline_between_rules &&
                                                    o &&
                                                    this._output.previous_line &&
                                                    "{" !== this._output.previous_line.item(-1) &&
                                                    this._output.ensure_empty_line_above("/", ","),
                                                    (this._output.space_before_token = !0),
                                                    "expand" === this._options.brace_style
                                                        ? (this._output.add_new_line(),
                                                            this.print_string(this._ch),
                                                            this.indent(),
                                                            this._output.set_indent(this._indentLevel))
                                                        : (this.indent(), this.print_string(this._ch)),
                                                    this.eatWhitespace(!0),
                                                    this._output.add_new_line())
                                                : "}" === this._ch
                                                    ? (this.outdent(),
                                                        this._output.add_new_line(),
                                                        "{" === _ && this._output.trim(!0),
                                                        (u = c = !1),
                                                        p && (this.outdent(), (p = !1)),
                                                        this.print_string(this._ch),
                                                        (o = !1),
                                                        this._nestedLevel && this._nestedLevel--,
                                                        this.eatWhitespace(!0),
                                                        this._output.add_new_line(),
                                                        this._options.newline_between_rules &&
                                                        !this._output.just_added_blankline() &&
                                                        "}" !== this._input.peek() &&
                                                        this._output.add_new_line(!0))
                                                    : ":" === this._ch
                                                        ? (!o && !a) ||
                                                            this._input.lookBack("&") ||
                                                            this.foundNestedPseudoClass() ||
                                                            this._input.lookBack("(") ||
                                                            u ||
                                                            0 !== h
                                                            ? (this._input.lookBack(" ") &&
                                                                (this._output.space_before_token = !0),
                                                                ":" === this._input.peek()
                                                                    ? ((this._ch = this._input.next()),
                                                                        this.print_string("::"))
                                                                    : this.print_string(":"))
                                                            : (this.print_string(":"),
                                                                p ||
                                                                ((this._output.space_before_token = p = !0),
                                                                    this.eatWhitespace(!0),
                                                                    this.indent()))
                                                        : '"' === this._ch || "'" === this._ch
                                                            ? (this.preserveSingleSpace(n),
                                                                this.print_string(this._ch + this.eatString(this._ch)),
                                                                this.eatWhitespace(!0))
                                                            : ";" === this._ch
                                                                ? 0 === h
                                                                    ? (p && (this.outdent(), (p = !1)),
                                                                        (c = u = !1),
                                                                        this.print_string(this._ch),
                                                                        this.eatWhitespace(!0),
                                                                        "/" !== this._input.peek() && this._output.add_new_line())
                                                                    : (this.print_string(this._ch),
                                                                        this.eatWhitespace(!0),
                                                                        (this._output.space_before_token = !0))
                                                                : "(" === this._ch
                                                                    ? this._input.lookBack("url")
                                                                        ? (this.print_string(this._ch),
                                                                            this.eatWhitespace(),
                                                                            h++,
                                                                            this.indent(),
                                                                            (this._ch = this._input.next()),
                                                                            ")" === this._ch || '"' === this._ch || "'" === this._ch
                                                                                ? this._input.back()
                                                                                : this._ch &&
                                                                                (this.print_string(this._ch + this.eatString(")")),
                                                                                    h && (h--, this.outdent())))
                                                                        : (this.preserveSingleSpace(n),
                                                                            this.print_string(this._ch),
                                                                            this.eatWhitespace(),
                                                                            h++,
                                                                            this.indent())
                                                                    : ")" === this._ch
                                                                        ? (h && (h--, this.outdent()), this.print_string(this._ch))
                                                                        : "," === this._ch
                                                                            ? (this.print_string(this._ch),
                                                                                this.eatWhitespace(!0),
                                                                                !this._options.selector_separator_newline ||
                                                                                    p ||
                                                                                    0 !== h ||
                                                                                    c ||
                                                                                    u
                                                                                    ? (this._output.space_before_token = !0)
                                                                                    : this._output.add_new_line())
                                                                            : (">" !== this._ch &&
                                                                                "+" !== this._ch &&
                                                                                "~" !== this._ch) ||
                                                                                p ||
                                                                                0 !== h
                                                                                ? "]" === this._ch
                                                                                    ? this.print_string(this._ch)
                                                                                    : "[" === this._ch
                                                                                        ? (this.preserveSingleSpace(n), this.print_string(this._ch))
                                                                                        : "=" === this._ch
                                                                                            ? (this.eatWhitespace(),
                                                                                                this.print_string("="),
                                                                                                v.test(this._ch) && (this._ch = ""))
                                                                                            : ("!" !== this._ch || this._input.lookBack("\\")
                                                                                                ? this.preserveSingleSpace(n)
                                                                                                : this.print_string(" "),
                                                                                                this.print_string(this._ch))
                                                                                : this._options.space_around_combinator
                                                                                    ? ((this._output.space_before_token = !0),
                                                                                        this.print_string(this._ch),
                                                                                        (this._output.space_before_token = !0))
                                                                                    : (this.print_string(this._ch),
                                                                                        this.eatWhitespace(),
                                                                                        this._ch && v.test(this._ch) && (this._ch = ""));
                        return this._output.get_code(e);
                    }),
                    (t.exports.Beautifier = _);
            },
            function (t, e, i) {
                var n = i(6).Options;
                function _(t) {
                    n.call(this, t, "css"),
                        (this.selector_separator_newline = this._get_boolean(
                            "selector_separator_newline",
                            !0
                        )),
                        (this.newline_between_rules = this._get_boolean(
                            "newline_between_rules",
                            !0
                        ));
                    t = this._get_boolean("space_around_selector_separator");
                    this.space_around_combinator =
                        this._get_boolean("space_around_combinator") || t;
                    var e = this._get_selection_list("brace_style", [
                        "collapse",
                        "expand",
                        "end-expand",
                        "none",
                        "preserve-inline",
                    ]);
                    this.brace_style = "collapse";
                    for (var i = 0; i < e.length; i++)
                        "expand" !== e[i]
                            ? (this.brace_style = "collapse")
                            : (this.brace_style = e[i]);
                }
                (_.prototype = new n()), (t.exports.Options = _);
            },
        ],
            _ = {};
        var t = (function t(e) {
            var i = _[e];
            if (void 0 !== i) return i.exports;
            i = _[e] = { exports: {} };
            return n[e](i, i.exports, t), i.exports;
        })(15);
        e = t;
    })();
    var t = e;
    "function" == typeof define && define.amd
        ? define([], function () {
            return { css_beautify: t };
        })
        : "undefined" != typeof exports
            ? (exports.css_beautify = t)
            : "undefined" != typeof window
                ? (window.css_beautify = t)
                : "undefined" != typeof global && (global.css_beautify = t);
})();
