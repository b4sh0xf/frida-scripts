#int array[] = [777,444,999];

.global _start

.section .data
array:
	.word 777,444,999

.section .text
_start:
	adr x0, array    // array's address to x0 register
	ldr w1, [x0]     // value stored at x0 pointed address to w1 (array[0])
	ldr w2, [x0, #4] // array[1]
	ldr w3, [x0, #8] // array[2]

	mov x8, #93
	mov x0, 77
	svc 0
