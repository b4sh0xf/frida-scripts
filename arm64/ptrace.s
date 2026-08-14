.global _start

.section _text
start:
	adrp x9,  59
	add  x9,  x9, #0x48
	str  wzr, [x9]
	mov  x16, #0x1a
	svc  #0x80
	b.lo 0x102a4d800
	stp  x29, x30, [sp, #-0x10]
	mov  x29, sp
	bl   0x102a46cf4
	mov  sp, x29
	ldp  x29, x30, [sp], #0x10
	ret
	ret
