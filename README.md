# kuro-delta(delta version Kuro language)

この言語は私（hota1024）がプログラミング言語を自作する方法を試しながら作った低機能なプログラミング言語です。あくまで学習用なのでちゃんとした作りにはなっていません。挙動がおかしい場合があります。

ちなみに言語名は `Kuro-delta` です。

主な機能とは以下のとおりです。

- 変数 `let <name> = <expression>` or `const <name> = <expression>`
- 関数定義 `fn <name>(arg0, arg1, ...) {}`
- 条件分岐 `if <condition> { <statement> } else { <statement> }`
- 繰り返し `while <condition> { <statement> }`

## 🚀 Hello world

### ステップ1

任意のディレクトリに `hello.kuro` というファイルを作成する。
内容を以下のとおり記述する。

```rust
use_mod("std_io")

io_println("Hello world")
```

### ステップ2

先程の `hello.kuro` があるディレクトリで以下のコマンドを実行する。

```bash
npx kuro-delta hello.kuro
```

`Hello world` と表示されれば成功です！🎉

## 基本構文

### リテラル

リテラルは3種類あります。

#### String literal

文字列リテラルです。通常、文字列をダブルクォーテーションで囲むことで文字列リテラルとして解釈されます。

またダブルクォーテーション内で文字をエスケープする際は文字の先頭に `\` を付けます。

```rust
"Hello world"

"The program says \"Hello world\""
```

#### Numeric literal

数値リテラルです。数値をそのまま記述することで数値リテラルとして解釈されます。

また数値リテラル中の `.` を用いた少数の表現も可能です。

```rust
1024

3.14
```

#### Boolean literal

真偽値リテラルです。正直、真偽値をリテラルにするかどうかは迷いましたが、真偽値リテラルです。

`true` と `false` の2つのキーワードで表現されます。

```rust
true

false
```

### 変数

変数を宣言するには `let` キーワード、もしくは `const` キーワードを用います。
また `const` キーワードを用いて宣言された変数は**再代入不可能**な変数になります。

```rust
let age = 16
const PI = 3.14
```

### 式

式とは実行された際に**何らかの値を返す**ものです。

例として以下のようなものを指します。

```rust
3 * (2 + 1)

"Hello" + " " + "world"

const PI = 3.14
const PI2 = PI * 2
```

上記のように**数値の式**や**文字列の式**や**変数を用いた式**などの表現が可能です。

また `(<expression>)` とすることで式の優先度を決めることができます。

### 文

文とは実行されても**値を返さない**ものです。

例として以下のようなものを指します。

```rust
if a < b {
  io_println("a is less than b")
}

fn fib(n) {
  if n < 3 {
    1
  } else {
    fib(n - 1) + fib(n - 2)
  }
}
```

文の種類は以下のとおりです。

### `if` - 条件分岐

#### 構文

```rust
if <condition> {
  <then_statement>
} [else [if] {
  <else_statement>
}]
```

#### 解説

`<condition>` が `truthy` な場合 `<then_statement>` が実行されます。

逆に `<condition>` が `falsy` だった場合 `else` 句があるなら `<else_statement>` が実行されます。

また

```rust
if a == b {
  io_println("a equals b")
} else if a < b {
  io_println("a less than b")
} else {
  io_println("a greater than b")
}
```

のように `else if` と続けて `if` 文を書くことも可能です。

### `while` - 繰り返し

#### 構文

```rust
while <condition> {
  <statement>
}
```

#### 解説

`while` 文は `<condition>` が `truthy` な間 `<statement>` を**繰り返し**実行します。

### 関数

関数とは一連の処理を一般化してプログラムの様々な場所で簡潔にその処理を実行する仕組みです。間違ってたらごめんなさい。

関数の定義は以下のように行います。

```rust
fn <name>(arg0, arg1, ...) {
  <statement>
}
```

実際に**フィボナッチ数列を計算する関数**を見てみましょう。

```rust
fn fib(n) {
  if n < 3 {
    return 1
  }

  return fib(n - 1) + fib(n - 2)
}
```

この関数は与えられた引数 `n` 番目のフィボナッチ数列の数を返す関数です。

`return` 文を使用することで値を返すことができます。

また関数で最後に評価される式は `return` を省略して書くことができます。

```rust
fn two() {
  2 // return を省略できる
}

two() // 2 が返る
```

また `if` は特殊な文であり、関数内では `if` 文も先程のルールを適用して使用することができます。

```rust
fn fib(n) {
  if n < 3 {
    1
  } else {
    fib(n - 1) + fib(n - 2)
  }
}
```

### モジュール

モジュールは `Kuro-delta` 言語の枠を超えてNode.jsなどのAPIを呼び出すためのものです。

モジュールを利用することで標準入出力や配列などの機能を利用することができます。

モジュールを読み込むためには `use_mod` 関数を利用します。

```rust
use_mod(<module_id>)
```

`module_id` に使いたいモジュールのIDを渡すことでそのモジュールをロードしてくれます。

例として標準入出力のモージュルIDである `std_io` を読み込んでみます。

```rust
use_mod("std_io")
```

このように記述することで標準入出力が利用できるようになります。

この `std_io` をロードすると標準出力のための関数である `io_println` が利用可能になります。早速試してみましょう。

```rust
use_mod("std_io")

io_println("Hello world")
```

これは兵十出力に `Hello world\n` と出力するプログラムの例です。

### モジュール一覧

### math

#### モジュールID

 `math`

#### コピペ用

`use_mod("math")`

#### 説明

数学系の変数や関数をロードします。

#### 追加される変数

変数は [ここ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math) で定義されているJavaScriptの `Math` オブジェクトのプロパティ名に `math_` を付けたものになっています。

例：`Math.PI` を使用する場合には `math_PI` を使う。

#### 追加される関数

関数は [ここ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math) で定義されているJavaScriptの `Math` オブジェクトのプロパティ名に `math_` を付けたものになっています。

例：`Math.cos` を使用する場合には `math_cos` を使う。

### parse

#### モジュールID

`parse`

#### コピペ用

`use_mod("parse")`

#### 説明

文字列を数値型へ変換する関数をロードします。

#### 追加される変数

> このモジュールは変数をロードしません。

#### 追加される関数

- `parse_int(string_value): number`
  - `string_value` を整数型へ変換して返します。

例：

```rust
use_mod("parse")

parse_int("10") // 10
```

### std_io

#### モジュールID

`std_io`

#### コピペ用

`use_mod("std_io")`

#### 説明

標準入出力に関する関数をロードするモジュールです。

#### 追加される変数

> このモジュールは変数をロードしません。

#### 追加される関数

- `io_println(content: any)`
  - `content` の最後に改行を付加し標準出力へ出力します。

例：

```rust
use_mod("std_io")

io_println("Hello world")
```

- `io_print(content: any)`
  - `content` をそのまま標準出力へ出力します。

例：

```rust
use_mod("std_io")

io_print("Hello world")
```

- `io_input()`
  - コマンドラインから入力された文字列を返します。

例：

```rust
use_mod("std_io")

io_print("What's your name?")
const name = io_input()

io_println("Hello " + name + "!")
```
