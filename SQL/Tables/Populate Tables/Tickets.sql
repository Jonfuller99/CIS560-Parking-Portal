--tickets not yet paid
INSERT INTO Parking.Tickets (OfficerID, PersonID, LotID, TimeIssued, Fee, LateCharge)
SELECT v.OfficerID, v.PersonID, v.LotID, v.TimeIssued, lty.Fee, 0
FROM (
    VALUES
        (1, 51, 1, N'2023-03-14')
) AS v(OfficerID, PersonID, LotID, TimeIssued)
    INNER JOIN Parking.Lots l ON l.LotID = v.LotID
    INNER JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType AND lty.YearOfValidity = YEAR(v.TimeIssued)

--late charge policy variables
DECLARE @LateChargeInterval INT = 60;
DECLARE @LateChargePercent INT = 20;

--tickets already paid
INSERT INTO Parking.Tickets (OfficerID, PersonID, LotID, TimeIssued, Fee, LateCharge, TimePaid)
SELECT v.OfficerID, v.PersonID, v.LotID, v.TimeIssued, lty.Fee, (DATEDIFF(DAY, v.TimeIssued, v.TimePaid) / @LateChargeInterval) * lty.Fee * @LateChargePercent / 100, v.TimePaid
FROM (
    VALUES
        (1, 51, 1, N'2023-03-14', N'2024-03-16')
) AS v(OfficerID, PersonID, LotID, TimeIssued, TimePaid)
    INNER JOIN Parking.Lots l ON l.LotID = v.LotID
    INNER JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType AND lty.YearOfValidity = YEAR(v.TimeIssued)


SELECT * FROM Parking.Tickets;