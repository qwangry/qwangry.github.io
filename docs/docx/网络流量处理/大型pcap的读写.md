# 大型pcap的读写

## 问题描述

使用 scapy 中的 rdpcap 函数时，它会一次性将 pcap 文件中的所有数据包读取到内存中，返回一个 PacketList 对象。因此，直接用 rdpcap 会占用大量内存，并且无法在处理大文件时实现逐条读取和处理。

## 解决方案

要避免一次性读取大文件，可以考虑使用 PcapReader，它能够逐条读取和处理数据包

```py
from scapy.all import PcapReader, wrpcap

input_pcap = 'input.pcap'
output_pcap = 'output.pcap'

# 使用 PcapReader 逐条读取数据包
with PcapReader(input_pcap) as pcap_reader:
    for packet in pcap_reader:
        # 判断逻辑，例如：只保留 IP 层的数据包
        if packet.haslayer('IP'):
            # 将符合条件的 packet 写入输出文件
            wrpcap(output_pcap, packet, append=True)
```