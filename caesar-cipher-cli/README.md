**CLI tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.


CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (number) <required>
2.  **-i, --input**: an input file (path to file or filename)
3.  **-o, --output**: an output file ( path to file or filemane)
4.  **-a, --action**: an action (encode or decode) <required>



**Usage example:**

```bash
$ node index --action encode --shift 7 --input input.txt --output output.txt
```

```bash
$ node index -a decode -s 1 -o output.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
