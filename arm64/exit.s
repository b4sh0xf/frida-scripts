.global _start // code entrypoint

.section .text // binary sections that stores functions and instructions that will be executed

/* https://chromium.googlesource.com/chromiumos/docs/+/master/constants/syscalls.md#arm64-64_bit
 * exit() function
 * aarch64-linux-gnu-as exit.s -o exit.o
 * aarch64-linux-gnu-ld exit.o -o exit
*/

_start:
	mov x8, #93
	mov x0, #77
	svc 0       // supervisor call ~ int 0x80 -> switch to kernel mode
