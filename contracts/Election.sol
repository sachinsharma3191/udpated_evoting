pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Election  {

    struct Candidate {
        uint candidate_id;
        string first_name;
        string last_name;
        uint256 dob;
        string candidate_info;
        string candidate_short_desc;
        string candidate_long_desc;
        string candidate_awards;
        uint voteCount;
    }
    
    struct ElectionResult  {
        uint candidate_id;
        string first_name;
        string last_name; 
        uint voteCount;
    }

    struct Voter {
        uint voter_id;
        bool hasVoted;
    }

    mapping(uint  => Voter) public voters;

    mapping(uint  => Candidate) public candidates;

    // Store Candiates Count
    uint public count = 1;
    
    uint public totalVotesCasted = 1;
    
    constructor() public {
        addCandidate("Tulsi","Gabbard",15766666,"American politician and Hawaii Army National Guard",
        "Current U.S. Representative for Hawaiis 2nd congressional district ,First Hindu member of Congress and the first Samoan-American voting member of Congress",
        "In 2002, Gabbard was elected to the Hawaii House of Representatives. Gabbard served in a field medical unit of the Hawaii Army National Guard in Iraq from 2004 to 2005 and was deployed to Kuwait from 2008 to 2009 as Army Military Police platoon leader.[3][4][5] She was a vice chair of the Democratic National Committee from 2013 to 2016, when she resigned to endorse Senator Bernie Sanders for the 2016 Democratic presidential nomination.Gabbard supports a Medicare for All health care plan she calls Single Payer Plus and strengthening Roe v. Wade by codifying it into federal law.[9] She co-sponsored the Family Act for paid family and medical leave and endorsed universal basic income.Gabbard was the first female combat veteran to run for president after running in 2020. On March 19, 2020, Gabbard dropped out of the 2020 race and endorsed former Vice President Joe Biden","3, Tulsi, Gabbard, 1981-04-12, American politician and Hawaii Army National Guard, Current U.S. Representative for Hawaiis 2nd congressional district ,First Hindu member of Congress and the first Samoan-American voting member of Congress, In 2002, Gabbard was elected to the Hawaii House of Representatives. Gabbard served in a field medical unit of the Hawaii Army National Guard in Iraq from 2004 to 2005 and was deployed to Kuwait from 2008 to 2009 as Army Military Police platoon leader.[3][4][5] She was a vice chair of the Democratic National Committee from 2013 to 2016, when she resigned to endorse Senator Bernie Sanders for the 2016 Democratic presidential nomination.Gabbard supports a Medicare for All health care plan she calls Single Payer Plus and strengthening Roe v. Wade by codifying it into federal law.[9] She co-sponsored the Family Act for paid family and medical leave and endorsed universal basic income.Gabbard was the first female combat veteran to run for president after running in 2020. On March 19, 2020, Gabbard dropped out of the 2020 race and endorsed former Vice President Joe Biden, On November 25, 2013, Gabbard received the John F. Kennedy New Frontier Award at a ceremony at the Institute of Politics at Harvards John F. Kennedy School of Government for her efforts on behalf of veterans.On March 26, 2014, Elle magazine honored Gabbard, with others, at the Italian Embassy in the United States during its annual Women in Washington Power List.On July 15, 2015, Gabbard received the Friend of the National Parks Award from the National Parks Conservation Association.");
        
        addCandidate("Hillary","Clinton",15766666,"Democratic Pary Leader","American politician, diplomat, lawyer, writer, and public speaker and served as First Lady of the United States from 1993 to 2001",
        "She served as First Lady of the United States from 1993 to 2001, as a United States senator from New York from 2001 to 2009, and as the 67th United States secretary of state from 2009 until 2013. Clinton became the first woman to be nominated for president of the United States by a major political party when she won the Democratic Party nomination in 2016","She was head of the White House Millennium Council and hosted Millennium Evenings, a series of lectures that discussed futures studies, one of which became the first live simultaneous webcast from the White House. Clinton also created the first White House Sculpture Garden, located in the Jacqueline Kennedy Garden, which displayed large contemporary American works of art loaned by museums");
       
        addCandidate("Donald","Trump",15766666,
            "Republic Pary Leader",
            "45th and current president of the United States,Businessman and  Television personality.",
            "Trump entered the 2016 presidential race as a Republican and defeated 16 other candidates in the primaries. His political positions have been described as populist, protectionist, and nationalist. Despite not being favored in most forecasts, he was elected over Democratic nominee Hillary Clinton, although he lost the popular vote. He became the oldest first-term U.S. president,[b] and the first without prior military or government service. His election and policies have sparked numerous protests. Trump has made many false or misleading statements during his campaign and presidency. The statements have been documented by fact-checkers, and the media have widely described the phenomenon as unprecedented in American politics. Many of his comments and actions have been characterized as racially charged or racist.During his presidency, Trump ordered a travel ban on citizens from several Muslim-majority countries, citing security concerns; after legal challenges, the Supreme Court upheld the policy's third revision. He enacted a tax-cut package for individuals and businesses, rescinding the individual health insurance mandate. He appointed Neil Gorsuch and Brett Kavanaugh to the Supreme Court. In foreign policy, Trump has pursued an America First agenda, withdrawing the U.S. from the Trans-Pacific Partnership trade negotiations, the Paris Agreement on climate change, and the Iran nuclear deal. During increased tensions with Iran, he ordered the killing of Iranian general Qasem Soleimani. He imposed import tariffs triggering a trade war with China, recognized Jerusalem as the capital of Israel, and withdrew U.S. troops in northern Syria to avoid Turkey's offensive on American-allied Kurds."
            ,"In 1983, Trump received the Jewish National Fund Tree of Life Award,after he helped fund the building of two playgrounds, a park, and a reservoir in Israel.In 1986,he received the Ellis Island Medal of Honor in recognition of patriotism, tolerance, brotherhood and diversity, and in 1995 was awarded the Presidents Medal from the Freedoms Foundation for his support of youth programs. Liberty University awarded Trump an honorary Doctorate of Business in 2012 and an honorary Doctor of Laws in 2017");
    
    }
       
    
    function addCandidate(string memory _first_name,string memory _last_name,uint256 _dob,string memory _candidate_info,
                            string memory _candidate_short_desc,string memory _candidate_long_desc,string memory _candidate_awards) public{
        Candidate memory candidate = Candidate(count,_first_name,_last_name,_dob,_candidate_info,_candidate_short_desc,_candidate_long_desc,_candidate_awards,0);
        candidates[count] = candidate;
        count = count + 1;
    }
    function vote (uint _candidateId,uint _voterId) public {
        //valdiate User has not Voted twice
        require(!voters[_voterId].hasVoted,"Voter aleady voted");
        // update candidate vote Count
        candidates[_candidateId].voteCount++;
        //Update voter info to true
        voters[_voterId].hasVoted = true;
        //Increment Total Vote Count for Auditing
        totalVotesCasted++;
    }

    function getCandidates() public view returns (Candidate[] memory){
      Candidate[] memory candidateList = new Candidate[](count);
      for (uint i = 0; i < count; i++) {
          candidateList[i] = candidates[i];
      }
      return candidateList;
    }
    
    function getTotalVotes() public view returns(uint){
        return totalVotesCasted;
    }
    
    function getElectionResult() public view returns (ElectionResult[] memory) {
        ElectionResult [] memory result = new ElectionResult[](count);
        for(uint  i =0; i < count; i++){
            result[i] = ElectionResult(candidates[i].candidate_id,candidates[i].first_name,candidates[i].last_name,candidates[i].voteCount);
        }
        return result;
    }
}