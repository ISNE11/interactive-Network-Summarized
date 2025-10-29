# Final Notes

DHCP 	: 	Give you a 	ip-address
IP 	Address
Subnet Mask
Default Gateway
DNS
Operation
Discover : Client 	find 	a DHCP 	Server (Broadcast (
Offer 	: 	Server give 	ip-address 	proposal 	to 	client.
Request 	: 	Client 	accept to 	server.
Ack 	: 	Server 	accept and approve that 	ip-address.
DHCP Relay (IP 	Helper 	Address /
> 	If DHCP Server 	is 	in different VLAN Subnet ,
it need to use 	DHCP Reply Agent
for sending 	DHCP request.
IPv6 	and 	SLAAC
SLAAC Can 	make IPvb by not using DHCPv6 .
Configure
DHCP Pool
ip deep 	exclude -
address 	192 . 168 .
1 . 1 (192.
168. 1 .
2]
ipdhep pool 	ISNEPool Villa
network 	192 . 160. 1 . 0 	255.
255 . 255. 0
Verify DHCP : Show ip dep binding
DHCP Relay 	Van 18
interface 	Van 	10 	I
iP address 	10 . 10 . 10 . 1 	255 . 255 . 255 . 0
ip 	helper-address 	10 . 10 . 20 . 2 us Vlan 20
- - 1 of 18 --
Enterprise 	Campus 	Network Design
Core 	Switch
Distribution 	Switch
< Redundancy
Access Switch
Core 	Switch
Backbone 	of 	Network
Connect to 	Distribution 	Switch
use 	13 (Network Layer 1
No policy , ACL ,
Filter (speed Priority
Should do Redundancy 	(Lazy to draws
simple and 	efficient design
Distribution 	Switch
Link and 	Combine 	Access Switches
Ls (Network Layer) between 	Core-Distribution 	and Dis-Dis
12 (Data Link) 	between 	Distribution - Access
High 	throughput
Security such as 	ACL
QoS
should do Redundancy
- - 2 of 18 --
Access 	Switch
Link 	to 	client(edge)
use 	12 	(Data Link Layer (
should have a lot of ports
QoS , VLAN , 	Security
recommend 	has 	uplian 2 ports 	per switch
Modular 	Network Design
Separate 	part 	of network module
Basicly 	Enterprise 	is divided to 	Core 	and 	Switch 	Block
Switch 	Block
A group of 	Distribution + Access
Each blocks 	will 	link to core layer
If some block has problem , another block will not be affected.
Should not exceed 	2,
000 users per block
Collapse CoreDistribution + Core
- - 3 of 18 --
Wireless 	LAN 	(WLAN)
* AP Access Point
Mode 	of 	WLAN
Ad-Hoc (IBSS) : Connet 	without 	AP
Infrastructure (BSS) : 	Ap is 	central
ESS (Extend 	Service Set) 	:
Every Ap are 	connected via lan
* connecting to 	AP called "Association"
Ap 	Operation
connecting from 	wire 	to wireless
Organize SSID ,
VLAN to 	Client.
ASED Van
Can 	map 	Vlan to the 	SSID 	(MU- Van 60
Wireless 	Cell 	and Equipting Ap
Ap area service - Cell
Equipting a little bit overlap 	for 	roaming.
If cells in too big , too many user and 	speed down.
Best 	pattern 	is Honey Comb Pattern. 	g 	8 	G
..
WLAN 	Structure
Autonomous WLAN
each 	Ap work independly
Suite 	for small network
Unified 	WLAN 	(CUWN)
Controlled by WLC (Wireless Lan Controller (
Suite 	for 	big 	Organization
- - 4 of 18 --
Principles of 	CUwN
Ap Lightweight AP (LAP)
LAp 	will send data to WLC
Role : 	LAD (11-2, Associate user) ,
WLC (L3+, Security , Config)
WLC-LAP 	Communicate by 	CAPWAP
CAPWAP (Control 	and
Provisioning of Wireless Access Point (
for Connect 	WLC and LAP
Authenticate 	by X . 509 Certificate for preventing fake 	Ap
WLC 	Can 	Auto Config
Channel/Power
Load Balancing
Roaming
Intrusion Detection
RF Monitoring
RomingAutonomous
Ap work independly
server will cut connect previous Ap and make a connection to new
CUWN (Controlled 	by WLC) AD
Intracontroller Roaming : more to new Ap under some whe
Intercontroller Roaming : 	more between 	different WLC.
12 Roaming : 	Same VLAN/Subnet ,
No change IP
·	13 Roaming 	New VLAN/Subnet ,Some IP by EoIP
Tunnel
- - 5 of 18 --
High 	Availability (HAL
> Decrease single point 	of 	failure
Basic 	of 	HA
Access 	Distribution 	core 	should have at least 	2 Devices·
redundant links 	for 	protect disconnect port.
2 switches 	can 	work instred- logical Switch (system see just 1)
Human see.
↓system see
Technology for 	logical Switch
StackWise 	StackWisePlus (Access SW) 	special wire from Cisco
for linking SW-SW 	(Use same 	IPI
USS (Virtual Switching 	System) (Distribute 	Core) - use 2 Chassis
using like 	one 	switch 	by 	supervisor 	one 	swis active
and 	another one 	is 	standby.
swi 	Swe 	gas
Chassist 	Chassis 2
VSL
StackWise Cables
USS
- - 6 of 18 --
Element 	of 	Chassis
Supervisor 	Engine (Route 	Processor
Line 	Card (Module Card)
PSU
Cooling 	System
Backplane/Midplane
Fabric Module
Redundant 	Component
Rack
Supervisor 	Redundancy
10 Sec + ++ 	< 1-2 Sec.
Route Processor Redundancy 	stateful Switchover
& Cisco
- - 7 of 18 --
Nonstop Forwarding (NSFI
use 	with 	990 	for 	switchingSupervisor to not effect sending
working 	by don't 	rebuild routing table 	all 	data
router that near having NSF 	help 	to send 	temp routing
Protocol 	: 	BGP , EIGRP,
OSPF , IS-IS
first 	Hop 	Redundancy (FHRD
Make Vitural 	IP 	for 	2 switches
name 	of Protocol
HSRP (Hot Standby Router Protocol) -
By 	Cisco
VRRP (Vitual Router Redundancy Protocol) -	>
By FETf (RFC5978)
G LBP 	(Gateway Load Balancing Protocol) 	+ By Cisco
Principle 	of 	HSRP
Active Router 	: Main , 	Standby Router : 	Back up.
use 	Vitual IP and 	Vitual 	MAC Address together.
PC 	Set to 	Vitual 	IP
If 	failover (Active Router boom) Standby Router 	will
Sized 	Vitual IP and MAC Address.
switch will know 	that sending to the new router by
11
using "Gratuitous 	ARP 	(Router Send ARP by myself
Rules of Choosing Active 	Router
high 	Priority (default=
100)
same Priority -	> highest 14 Address is 	Active .
If turn on 	preempt+ 	higher 	Priority 	can replace 	Active Pos.
- - 8 of 18 --
Quality of 	Service 	(QoS)
~ Network 	traffic 	priorization
Goal
DelayI
Jitter d
Packet Loss ↓
QoS 	for sloving Problem
HighSpeed 	VoIP
Stable 	video quality
Big file 	but 	no request for 	fast
Traffic Comparison
I file 	IClip 	Isound 	/TeamViewer
- - 9 of 18 --
Model
Best Effort Service
FIFO
No gravantee.
Integrate Services 	(Intserv)
1)pVideaHard 	QoS
traffic 	flows 	are 	reserved
Differentiated 	service (Diffserv (
Soft QoS
Class-based 	traffic (famous)
Class 	of 	Service 	(CoS)
Layer 2
use 	Ethernet Frame 	that has VLAN Tag (802 .
/Q)
has 	3 Bits (0-1) in 	the box 	called
Priority Code Point 	(PCP)
using for telling how important of frame
O =
Best Effort
5 : 	Sound
6-7 = Network Control
- - 10 of 18 --
Type of 	Service 	(ToS)
Layer 3
in 	IPv4 has 8 bits
replaced 	by DSCP
Differentiated 	Services 	Code 	Point 	(DSCP)
New 	Version of TOS
using 	top 	6 	bits of Tos fields
has 	value 	0-63
use in 	DiffServ QoS
IP Precedence 	Early
- 	ei Congestion
Notification.
Ex . 	DSCP 	: 46 	(101110)
IP Precedence : 5 	(101)
CoS 	: 	5
- - 11 of 18 --
Assured Forwarding (AF)
- >	oll100 = DSCP 28
Drop Priority
& 	always O
DSCP 	Code for 	At 	65 	b4 b3 	be 	be 	bo
Principle 	of 	QoS Iclass
1. Classification and Marking
separate type of traffic and"Mark" priority (DSCP and CoS (
2. Shaping and Policing
Shaping (Do it smooth) - TCP
Policing (Exceed = cut) - UDP
3. Congestion Management 	Q2 is 50 % of
FFO 	(first in first out) 	I 	bandwidth.
WRR (Weight Rounded Robin) 	Define weight 	Ex .
Q1 weight 50
PQ 	(Priority Quering ( 	Priority 	first.
CQ 	(Custom Quering & 	Reserve bandwidth
4. 	Congestion 	Avoidance
Tail 	Drop : 	Buffer full -	> tail will drop
Weight 	Early 	Random Detection (WERD): Set 	lengh inside 	buffer
If over lengh - choose weight (DSCP)
to decide to drop packet.
- - 12 of 18 --
Monitoring
Syslog
similar with log file in linux
SW/Router 	will send 	text 	of situation (portdown , change config)
components
Timestamp
Facility 	Code -
Categories of modules/functions generating 	ms
Serverity Code (0-1) 	-
lower is high 	serverity
mnemonic +
message text - 	Describe 	situation
Network Time 	Protocol
Synchronize time 	to 	Switch 	and Router
stratum 	: 	that time is 	closer the real time (Stratum 1 : closest
Simple 	Network Management Protocol 	(SNMP)
Monitor 	and management network
Components
SNMP Manager - Controller on Program (Cacti , Munin(
SNMP 	Agent-Sw/Router size for sending data to manager
Management Information Base (MIB) -
Database of Information devices.
(Interface, uptime, traffic
Object ID (OID) -
number for point information in MIB
C 1 . 3 . 6 . 1 . 1 .
2 . 1 . 2.
2 . 1 . 10 = Inbound Bytes)	-
Port 	OID Tree
161 -
Manager 	Request 	get all MIB
(Get request , Get next request,
Get Buth request ,
set 	request (
162 -	> Agent 	warn manager .
(SNMP trap , Inform Request(
Agent sent 	Agent wait Ack.
only
- - 13 of 18 --
SNMPv3
noAuthNoPriv -
No 	Authentication and encryption
authNoPriv-only Authentication
auth Priv 	- 	Authentication and encryption
Traffic Monitoring
Local 	SPAN (SPAN) 	: Source- Dest 	is in the same sur
Remote SPAN 	(RSPAN) : Using Special VLAN 	for sending
traffic mirror across many SW .
* require 	to create vlan for remoding .
Config
(serverity) 	logging console /Serverity]
clogging into internal buffers 	logging buffer (serverity] (sized
I check , 	show logging
(NTP) 	ntp 	server 	192 . 168 . 1 . 1 	Prefer Version 4
show 	htp 	status
show 	htp 	associations .
CRSPAN) 	Van 	11
remote-span
monitor 	session 	1 	source 	vlan 14 	both
monitor 	session 	1 destination remote Vlan 	11
(TS-Clocktime) service 	timestamps 	log datetime [Local time]
(Show-timezone] (msec] [year]
CTS-Uptime) 	service 	timestamps 	log 	uptime.
- - 14 of 18 --
Basic Security
Security Fundamentals 	(CIA-AIC Triad(
C -
Confidentiality 	: Only authorized individuals systems can access data
I -
Integrity : Only authorized individuals systems can change data
A-Availability : Data can be accessed reliably and timely
Firewall
filter 	packet 	from 	src/Dest 	IP
filter 	from 	port 	(TCP/UDP)
filter from 	url 	of HTTP Request
filter 	from 	State 	(Stateful 	firewall)
Position : 	between 	Lan and 	Internet.
for stateful firewall : Only 	Internal request to external .
Then,
external 	can 	reply internal.
Demilitarized 	Zone 	(DMZ)
The zone 	that between 	Internal 	and External 	network .
Separate 	servers that external 	can access
DMZ is 	less 	secure than LAN 	but 	prefer than 	no security
.
Intrusion 	Prevention System (IPS)
Detect 	and 	protect invading of 	network.
Detect 	Attach 	Signature 	(DDoS ,
Virus, worm (
should 	always 	update 	signature.
can 	send/block 	irregular traffic .
install 	"inline" 	like 	a 	firewall.
- - 15 of 18 --
Next-Gen 	Firewall 	(NGFW)
Application 	Visibility and Control (AVCI : 	Facebook , Google
Advance 	malware 	protection
URL Filtering
may be 	have 	function 	of 	IPS or 	NGIPS
Next-Gen 	IPS 	(NGIPS)
Application 	Visibility and Control (AVCI
Contextual 	Awareness 	: 	know 	state of host (os/hole)
Reputation-based 	filtering : Block bad 	IP/url
Event 	Impact 	Level
- - 16 of 18 --
Network Project
Life Cycle
1.
Planning and Design
Topology
physically
Logically
Devices
Technology and 	Protocol Design
2.
DeploymentandImplementati
a
Testing
Commissioning
If move from 	old system -	> Network Migration.
3. 	Network 	OAM 	(Operation , Administration , Maintenance)
use NMs 	(Network Management System) for checking Network.
always maintenance.
back-up I config
Update 	Firmware/Patch .
4	. 	Optimization
Performance
security
UX
- - 17 of 18 --
Components
Network 	Solution Design
Hierarchical 	2 Core-Distribution -
access)
Choose devices 	from 	budget
Service Design
VLAN , IP-Address, Routing
Prevent loop 	12 (Stp)
Enough Capacity of wifi
redundancy
NAT
security Design
Firewall (Networks
Antivirus (Host]
OAM and Management
SNMPINMS
Remote 	Maintenance
back-up , always 	update 	software.
- - 18 of 18 --
