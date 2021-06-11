-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2021 at 02:59 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `askme_user`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(5) NOT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `sex` int(2) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `username`, `password`, `email`, `sex`, `phone`) VALUES
(1, 'Gretchen', 'Clark', 'WXI72JCH6GV', 'VGC45WQP3IV', 'Quisque.ornare@interdumenimnon.edu', 2, '1-886-786-3599'),
(2, 'Brianna', 'Santos', 'CGC13VHA9YI', 'PFA62AVU9SE', 'tristique.senectus.et@vitae.co.uk', 1, '1-760-873-2986'),
(3, 'Graham', 'Sanchez', 'SRX02WOA9JN', 'GEH59SIU9VP', 'vel@MaurismagnaDuis.edu', 2, '1-394-734-8769'),
(4, 'Rudyard', 'Gardner', 'HSV66HKQ8JB', 'FOS89BZH5XK', 'sit@Ut.co.uk', 1, '1-607-645-7858'),
(5, 'Lev', 'Russo', 'QIS31WMF8NJ', 'IYQ82AQJ8ZG', 'laoreet@Donec.ca', 1, '1-968-465-0129'),
(6, 'Damon', 'Walton', 'BKN82SCM8FJ', 'CEH68XKP2FR', 'eget@ligula.co.uk', 1, '1-232-324-5543'),
(7, 'Merritt', 'Fuller', 'YDU30CUP0AN', 'WWW18PPK6LB', 'vel.sapien.imperdiet@a.co.uk', 3, '1-228-648-8592'),
(8, 'Hop', 'Bridges', 'PAN09WSS5KR', 'QCG80VJR5EW', 'ipsum.Suspendisse@fermentumarcuVestibulum.edu', 2, '1-796-711-7025'),
(9, 'Derek', 'Rodriquez', 'MSY15KPQ4KJ', 'BPX96EDP2DN', 'diam.eu@libero.edu', 2, '1-295-833-1168'),
(10, 'Erasmus', 'Walter', 'TEX80TON9XP', 'KWJ60WXM1VT', 'vel@esttemporbibendum.com', 1, '1-359-464-1420'),
(11, 'Ira', 'Torres', 'HSJ30KBI4OY', 'FML64IAI9GX', 'ante.Maecenas.mi@rutrumFusce.edu', 3, '1-621-781-9639'),
(12, 'Cora', 'Mcbride', 'SVD58MCM6KX', 'BWE23KJH9IV', 'nibh.enim@eratnonummyultricies.co.uk', 1, '1-184-289-2641'),
(13, 'Donovan', 'Robinson', 'BHP27DXW2DP', 'KLP50NIR7SQ', 'amet@ipsum.co.uk', 3, '1-533-333-9465'),
(14, 'Vaughan', 'Mckinney', 'ILB52MCG3XX', 'AQC36YTK3YX', 'ut@neque.edu', 1, '1-627-530-8651'),
(15, 'Kennan', 'Wong', 'PCX09BSQ6YX', 'KQM23NQE5PX', 'eros.nec.tellus@nequeNullamut.edu', 2, '1-475-899-2927'),
(16, 'Bruce', 'Mccormick', 'CHU36QUX0YW', 'WFX88DVS2VT', 'Duis@Naminterdumenim.net', 3, '1-923-350-5371'),
(17, 'Remedios', 'Jones', 'KWT54RXH4YH', 'MNF41QLW4SU', 'vel@cursusluctus.net', 2, '1-463-180-6370'),
(18, 'Noel', 'Griffin', 'ELC85VHQ7RJ', 'SUS31TYO0II', 'adipiscing.non.luctus@acipsum.org', 2, '1-609-690-2917'),
(19, 'Baxter', 'Shaw', 'XAI12BWB7FE', 'MBD58PRR0HN', 'eu.accumsan.sed@volutpat.co.uk', 2, '1-115-525-4029'),
(20, 'Martina', 'Hunt', 'OGF06OGU3BF', 'HWZ59HQQ3GC', 'gravida@odioPhasellusat.edu', 3, '1-169-357-4632'),
(21, 'Joel', 'Lamb', 'ZHM23ZZY7LP', 'FCL96LGK7VC', 'ullamcorper.viverra.Maecenas@Duis.edu', 2, '1-648-706-8986'),
(22, 'Arden', 'Valencia', 'IFN61QFG9UU', 'FAP19BJH5EO', 'morbi.tristique@luctussitamet.co.uk', 3, '1-162-987-1340'),
(23, 'Quail', 'Levy', 'IXK50HSB3NO', 'YJE87IBT4YP', 'tincidunt.adipiscing.Mauris@gravidamaurisut.com', 3, '1-512-690-8245'),
(24, 'Porter', 'Mccormick', 'SVJ92MMS6UW', 'HRQ57ASD8OV', 'velit.Sed@Fuscediamnunc.ca', 1, '1-249-123-4824'),
(25, 'Kermit', 'Vasquez', 'JZX07MXX5BN', 'YCL38PSA9NI', 'Curabitur.ut@In.co.uk', 1, '1-672-332-2139'),
(26, 'Jonah', 'Tate', 'MCE61JIT8CN', 'PSW67NFJ7MM', 'Proin.eget@turpis.co.uk', 2, '1-647-494-2394'),
(27, 'Barrett', 'Shannon', 'MZD09PAS4ZW', 'XDD93EXG4RZ', 'Pellentesque@sempereratin.ca', 1, '1-548-571-3903'),
(28, 'Maile', 'Patel', 'WGV15LZU5OO', 'LSD67KWK8FZ', 'consectetuer.euismod.est@senectusetnetus.ca', 1, '1-133-959-2084'),
(29, 'Rosalyn', 'Fischer', 'KQX09UJB8YE', 'HKO22NCN7SA', 'Mauris@laoreetliberoet.ca', 1, '1-763-768-7470'),
(30, 'Alma', 'Schmidt', 'IBY07JTR6PF', 'JDQ35ZAM3WO', 'justo@ligulaconsectetuer.edu', 3, '1-493-458-9756'),
(31, 'Rhoda', 'Riley', 'XBB90GPU6IW', 'DCD88XKI7ZB', 'egestas@elit.com', 2, '1-736-342-9205'),
(32, 'Sophia', 'Franks', 'YGZ72IYN8LB', 'NBQ09PKA6HP', 'ante.iaculis@risus.ca', 1, '1-860-426-9373'),
(33, 'Brock', 'Brennan', 'IKO00ZRG1RC', 'ZTB31MAM2LO', 'purus@rutrumurnanec.edu', 3, '1-560-151-1629'),
(34, 'Mason', 'Goff', 'YWK06UQQ5DI', 'SBB63JMX9NE', 'Aenean.sed.pede@nequetellus.org', 3, '1-269-333-4922'),
(35, 'Lucian', 'Christian', 'AMQ94YGL2SL', 'WEG44TCO8BI', 'eget.metus@Cumsociisnatoque.org', 1, '1-256-310-5013'),
(36, 'Donovan', 'Knapp', 'BRN16FKD6SP', 'SRZ36ACU8KB', 'nonummy.ipsum.non@facilisis.co.uk', 2, '1-842-999-9559'),
(37, 'Shea', 'Walter', 'JEF42PHT7GE', 'HKL76ELO3CC', 'Donec@felisullamcorperviverra.co.uk', 2, '1-884-166-3116'),
(38, 'Gray', 'Hoffman', 'GQB11PPL2ZD', 'LHV88NCV7WN', 'Integer.urna@montes.org', 2, '1-154-714-6018'),
(39, 'Raya', 'Hickman', 'HVQ85OHA5GR', 'DFS74XKD4KJ', 'semper.cursus.Integer@fermentumfermentumarcu.com', 3, '1-727-701-2752'),
(40, 'Boris', 'Ratliff', 'ZJZ56UAP3GD', 'QMH16EYY3HP', 'interdum.Curabitur.dictum@malesuada.ca', 2, '1-919-360-8242'),
(41, 'Pascale', 'Browning', 'FKE50IWM5NC', 'WYG06KVL2RS', 'non@orciadipiscingnon.edu', 1, '1-371-896-3149'),
(42, 'Risa', 'Brock', 'XIW20VVT2VQ', 'HQS34KZO0ZD', 'vel.pede@quisturpis.org', 2, '1-130-458-1864'),
(43, 'Laura', 'Pitts', 'WOC67KSO3EE', 'KEP09SHG3NE', 'adipiscing.ligula@sedconsequatauctor.ca', 2, '1-473-339-7971'),
(44, 'Maite', 'Conley', 'JFJ55TMN7SI', 'FYJ58KLP7KD', 'odio.Aliquam.vulputate@dolor.net', 2, '1-157-271-2393'),
(45, 'Jason', 'Stewart', 'AKT42VCQ5FQ', 'BOI77YAO6GN', 'Quisque.imperdiet.erat@augueporttitorinterdum.ca', 1, '1-765-350-1984'),
(46, 'Herrod', 'Vincent', 'NVV12EBM5FP', 'VVS10PAK3VS', 'nulla.ante@malesuadaid.com', 1, '1-771-492-4529'),
(47, 'Karyn', 'Hansen', 'AUV39HAB4DO', 'CJS93OHO7LL', 'commodo.auctor@eu.co.uk', 3, '1-710-779-2725'),
(48, 'Jane', 'Knapp', 'QSM46NIC7XC', 'ZMD45XPZ0KP', 'non.feugiat.nec@idmagnaet.ca', 2, '1-320-131-8317'),
(49, 'Desiree', 'Key', 'RUF50NVD3PT', 'LWY94FFO5HT', 'purus.gravida@congueelitsed.com', 3, '1-324-215-0121'),
(50, 'Kelsey', 'Madden', 'XRG66XRT3FR', 'SBX37PCP2WK', 'parturient@accumsan.org', 1, '1-258-226-3640'),
(51, 'Tamara', 'Vazquez', 'VDK60OOR5JX', 'NAH26CKR6ZG', 'eget@lorem.edu', 2, '1-427-448-6985'),
(52, 'Dylan', 'Estes', 'VNN40XKU1NV', 'OMM52GFX6GO', 'fringilla.Donec@maurisaliquameu.ca', 2, '1-199-661-0623'),
(53, 'Iola', 'Lancaster', 'HZU39RCU9OL', 'QBG11KZU0GK', 'scelerisque@eueratsemper.edu', 2, '1-318-759-7284'),
(54, 'Joy', 'Patel', 'KVL86SYJ3UV', 'IRB52NQS1ZK', 'a@cursuspurusNullam.com', 1, '1-790-236-7255'),
(55, 'Ila', 'Pittman', 'SBV97GIP4WX', 'BVX78YQF5OA', 'consectetuer.ipsum.nunc@quis.edu', 2, '1-270-150-4910'),
(56, 'Cadman', 'Taylor', 'BWF16XLK6AY', 'UHN49YTP8CX', 'odio@molestie.org', 2, '1-252-548-9366'),
(57, 'Solomon', 'Randall', 'CAL77AEU2QZ', 'WYI02UXD4JF', 'ac.mi@fringillaornareplacerat.org', 2, '1-926-952-2345'),
(58, 'Burke', 'Fitzpatrick', 'ODT57MXS1OD', 'ABW12ECH0YU', 'Phasellus@pedenonummy.edu', 3, '1-517-342-9821'),
(59, 'Dolan', 'Garcia', 'VSP54THJ8NM', 'WWH69NIW2RR', 'imperdiet.ullamcorper.Duis@ligulaNullam.org', 1, '1-129-519-0993'),
(60, 'Rajah', 'Fitzgerald', 'JQZ54AOR5VO', 'DFI54AJI5VC', 'turpis.In.condimentum@Suspendisse.net', 3, '1-667-119-8647'),
(61, 'Dorian', 'Thompson', 'PWK00WUL0KH', 'IEU77ECX6NO', 'Proin.eget@natoquepenatibus.co.uk', 3, '1-178-185-3473'),
(62, 'Karly', 'Ward', 'HFZ09TZG7EM', 'QRH77EVP9RW', 'Nullam.vitae.diam@quisarcuvel.net', 3, '1-505-746-4660'),
(63, 'Alden', 'Bernard', 'HPA98AEX8LW', 'KXV92ROM6DV', 'natoque.penatibus.et@dolorNulla.co.uk', 1, '1-312-576-9069'),
(64, 'Kathleen', 'Knowles', 'LAT88WCI9QY', 'ENN77IYE6LV', 'ac@diam.com', 3, '1-831-616-4457'),
(65, 'Rhiannon', 'Brock', 'FYF00XSE2XJ', 'HBJ14NFZ0VK', 'in.felis@nec.net', 2, '1-437-979-5780'),
(66, 'Basia', 'Mcfarland', 'RAR88SKA7XM', 'LZY61VZU3LF', 'rutrum.non@placerataugueSed.co.uk', 1, '1-902-324-0834'),
(67, 'Ocean', 'Figueroa', 'RFP37YPM3ID', 'PWJ20FEG6SZ', 'sed.pede@et.net', 1, '1-177-605-3527'),
(68, 'Kitra', 'Bruce', 'FQJ40JEX5ZK', 'CKH10TSS9UG', 'Aenean.sed.pede@noncursusnon.edu', 1, '1-384-864-2753'),
(69, 'Ignacia', 'Mcleod', 'CDZ66WZY4NZ', 'ZEX18MUQ9CR', 'nunc.risus.varius@dictumplacerat.com', 3, '1-771-677-3786'),
(70, 'Axel', 'Ramsey', 'PCR21NVX5IM', 'FWR20BFE9ZQ', 'blandit.enim@temporbibendum.ca', 1, '1-512-396-7800'),
(71, 'Ray', 'Riddle', 'VFM02NGC4NA', 'KBB00UXD1VE', 'fermentum@non.net', 2, '1-755-259-7106'),
(72, 'Gil', 'Ewing', 'NJC46NCY1HJ', 'KXR90WVD6DE', 'Fusce@purusaccumsan.co.uk', 3, '1-118-388-1547'),
(73, 'Hilda', 'Hahn', 'OYJ37ZKB0OT', 'FTY68FBT0ZZ', 'eu.placerat@porttitorscelerisqueneque.org', 2, '1-645-296-4022'),
(74, 'Solomon', 'Ballard', 'KSV54PFP0ZJ', 'SNN32VGS2XI', 'adipiscing@nullaDonec.com', 2, '1-582-263-8466'),
(75, 'Cheryl', 'Hansen', 'ZUQ84IBG2ES', 'RAL10NSE2FT', 'lorem.luctus.ut@pharetraQuisque.co.uk', 1, '1-444-814-4060'),
(76, 'Calvin', 'Foster', 'JMI28UDQ5UT', 'AUC76ISL3XK', 'tellus.eu@atpretium.com', 1, '1-533-367-0255'),
(77, 'Arden', 'Moon', 'WMS20IDP6YX', 'YEI74IME1II', 'aliquam.iaculis@odio.net', 1, '1-505-600-7939'),
(78, 'Mona', 'Vega', 'VXR07WZX4DG', 'HWN80OJL9QS', 'mi.lorem@facilisisfacilisismagna.com', 2, '1-498-610-8352'),
(79, 'Nevada', 'Spears', 'XRV89CLQ6LQ', 'MWH13PKR8PM', 'aliquam.enim@duisemper.org', 3, '1-291-424-7376'),
(80, 'Fuller', 'Gates', 'RHI76LCY6TT', 'PBP73GHF3KE', 'Vestibulum.ante.ipsum@volutpatnunc.co.uk', 3, '1-598-597-3995'),
(81, 'Wesley', 'Levy', 'SDV36TCV2ZH', 'LKP36FQY2PK', 'lectus@Utnecurna.net', 3, '1-313-774-3264'),
(82, 'Rashad', 'Schneider', 'KZX52LMZ0NL', 'VON50LXC0LT', 'fringilla.est@Crasdolor.net', 1, '1-501-142-0652'),
(83, 'Ahmed', 'Rodriquez', 'DEO26ZOJ1YK', 'IXK78QRT6VU', 'Nam.ac.nulla@ultriciesornareelit.ca', 3, '1-870-621-0409'),
(84, 'Abigail', 'Booth', 'ART66RSB7ZC', 'ZKT24PWG4QW', 'dictum.Phasellus@sitametorci.edu', 2, '1-663-781-5300'),
(85, 'Priscilla', 'Sanders', 'SEC66BGV0VH', 'HTW23SQQ1DM', 'pretium.aliquet.metus@nequeMorbi.ca', 2, '1-642-706-8566'),
(86, 'Marvin', 'Bean', 'XLO23BIX2HC', 'ESI50JDX4MQ', 'Fusce.feugiat@euneque.net', 2, '1-726-721-2531'),
(87, 'Richard', 'Hardin', 'JDZ33TVD7MV', 'DGH75JUG7XF', 'Cum.sociis.natoque@primis.com', 1, '1-739-582-0345'),
(88, 'Ciara', 'Lloyd', 'ZPD93SOW3IM', 'JZG44LID9WM', 'diam.Pellentesque.habitant@mi.ca', 2, '1-351-442-0846'),
(89, 'Ulla', 'Byrd', 'LVJ24BMQ9LS', 'AOB07LUE5PO', 'nec.urna@Namporttitorscelerisque.edu', 3, '1-717-985-7626'),
(90, 'Jacob', 'Carroll', 'QFO89TFP0QV', 'WYR58QEB8ZG', 'ac.feugiat.non@velitegestas.net', 1, '1-130-234-9805'),
(91, 'Darryl', 'Haley', 'YJE44FQQ3FU', 'RUR53QLA2XJ', 'mauris.elit@acmetusvitae.edu', 3, '1-975-200-3727'),
(92, 'Sasha', 'Wynn', 'XVZ35THV2MV', 'VBZ17MXG3UB', 'magna.malesuada@lobortisClassaptent.edu', 1, '1-734-911-3350'),
(93, 'Nolan', 'Thomas', 'GZG70YUI6UC', 'RFX99LTF4XE', 'Nullam.scelerisque.neque@gravida.org', 2, '1-964-285-1532'),
(94, 'Yoshio', 'Vaughn', 'ELH52DTR6HH', 'GSZ43CNW8TW', 'lectus.pede.et@parturientmontesnascetur.co.uk', 2, '1-582-797-1493'),
(95, 'Kennedy', 'Frazier', 'CVL05LMQ2BQ', 'TFK70DAU0IH', 'amet.consectetuer@hendreritconsectetuercursus.ca', 2, '1-443-736-7219'),
(96, 'Elaine', 'Lloyd', 'UEL83CCF2CH', 'YAO43URY6GE', 'at.auctor@In.edu', 3, '1-797-483-8436'),
(97, 'Shannon', 'Atkinson', 'NKJ63KLG2GP', 'IQD86UUK6EV', 'mauris.erat.eget@nullaDonec.org', 1, '1-729-522-1606'),
(98, 'Jasmine', 'Dotson', 'JRU18MZL6CY', 'NEU82WPE5JO', 'aliquam@elementumsem.ca', 2, '1-374-927-4876'),
(99, 'Reece', 'Cantu', 'RMR22QUJ4DI', 'DLE92WYM1WQ', 'vestibulum@eratinconsectetuer.co.uk', 3, '1-825-555-4764'),
(100, 'Jasmine', 'Hurst', 'ZJP51SVZ0LH', 'ZWU17KJS5VA', 'arcu.Curabitur@adipiscingMaurismolestie.org', 1, '1-354-837-1826');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
